import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // facultatif mais pratique si utilisé dans tout le projet
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
