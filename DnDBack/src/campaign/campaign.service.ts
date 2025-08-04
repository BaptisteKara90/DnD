import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignModel } from './campaign.model';
import { Campaign as PrismaCampaign } from '@prisma/client';

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
      },
    });

    return this.toCampaignModel(campaign); // ⬅️ mapping ici
  }

  // ⬇️ FONCTION DE MAPPING (ajoute-la dans ce même fichier)
  private toCampaignModel(campaign: PrismaCampaign): CampaignModel {
    return {
      ...campaign,
      description: campaign.description ?? undefined,
      summary: campaign.summary ?? undefined,
    };
  }
}
