import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  private readonly mailerService: MailerService;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    mailerService: MailerService,
  ) {
    this.mailerService = mailerService;
  }

 async register(email: string, password: string, username: string): Promise<{ token: string }> {
  const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email déjà utilisé');

  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationToken = randomUUID(); // ou uuidv4()

  const user = await this.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      confirmationToken,
      isConfirmed: false,
    },
  });

  await this.mailerService.sendConfirmationEmail(email, confirmationToken);

  return { token: confirmationToken };
}

  async confirmEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { confirmationToken: token },
    });

    if (!user) throw new Error('Token invalide ou expiré');

    return this.prisma.user.update({
      where: { id: user.id },
      data: { isConfirmed: true, confirmationToken: null },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email invalide');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Mot de passe incorrect');

    const token = await this.signToken(user.id, user.email);
    return { user, token };
  }

  private async signToken(userId: number, email: string): Promise<string> {
    return this.jwt.signAsync({ sub: userId, email });
  }
}
