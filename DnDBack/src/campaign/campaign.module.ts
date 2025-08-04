import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CampaignService, CampaignResolver, PrismaService],
})
export class CampaignModule {}
