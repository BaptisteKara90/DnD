import { Campaign, CampaignRole } from '@prisma/client';
import { CampaignModel } from './campaign.model';

export function mapCampaignToModel(
  campaign: Campaign,
  role: CampaignRole,
): CampaignModel {
  return {
    id: campaign.id,
    name: campaign.name,
    description: campaign.description ?? undefined,
    summary: campaign.summary ?? undefined,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    ownerId: campaign.ownerId,
    role,
  };
}
