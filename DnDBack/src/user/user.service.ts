import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });
  }
}
