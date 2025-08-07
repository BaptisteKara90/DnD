import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailerService } from '../mailer/mailer.service';
import { User } from './user.model';



@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailerService, 
  ) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

   async create(data: { email: string; password: string; username: string }) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const confirmationToken = randomBytes(32).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        confirmationToken,
        isConfirmed: false,
      },
    });

 
    await this.mailService.sendConfirmationEmail(user.email, confirmationToken);

    return user;
  }

  async confirmEmail(token: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { confirmationToken: token },
    });

    if (!user) throw new Error('Token invalide ou expiré');

    return this.prisma.user.update({
      where: { id: user.id },
      data: { isConfirmed: true, confirmationToken: null },
    });
  }
}
