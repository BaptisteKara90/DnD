import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignModel } from './campaign.model';
import { mapCampaignToModel } from './campaign.mapper';

@Injectable()
export class CampaignService {
  constructor(private readonly prisma: PrismaService) {}

  async createCampaign(
    data: CreateCampaignInput,
    ownerId: number,
  ): Promise<CampaignModel> {
    const campaign = await this.prisma.campaign.create({
      data: {
        ...data,
        ownerId,
        memberships: {
          create: {
            userId: ownerId,
            role: 'DM',
          },
        },
      },
      include: { memberships: true },
    });

    return mapCampaignToModel(campaign, 'DM');
  }

  async getUserCampaigns(userId: number): Promise<CampaignModel[]> {
    const memberships = await this.prisma.campaignMembership.findMany({
      where: { userId },
      include: { campaign: true },
    });

    return memberships.map((membership) =>
      mapCampaignToModel(membership.campaign, membership.role),
    );
  }

  async joinCampaign(
    campaignId: number,
    userId: number,
  ): Promise<CampaignModel> {
    const existing = await this.prisma.campaignMembership.findFirst({
      where: { campaignId, userId },
    });
    if (existing) {
      throw new Error('User is already a member of this campaign');
    }

    const membership = await this.prisma.campaignMembership.create({
      data: {
        campaignId,
        userId,
        role: 'PLAYER',
      },
      include: { campaign: true },
    });

    return mapCampaignToModel(membership.campaign, membership.role);
  }
}
