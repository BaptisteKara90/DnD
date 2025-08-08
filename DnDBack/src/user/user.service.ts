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
