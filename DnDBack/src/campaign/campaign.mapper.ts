import { Campaign, CampaignRole } from '@prisma/client';
import { CampaignModel } from './campaign.model';
import { CampaignInvitationModel } from './campaign-invitation.model';

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

export function mapInvitationToModel(invitation: any): CampaignInvitationModel {
  return {
    id: invitation.id,
    campaignId: invitation.campaignId,
    campaignName: invitation.campaign.name,
    email: invitation.email,
    accepted: invitation.accepted,
    invitedByUsername: invitation.invitedBy.username,
    createdAt: invitation.createdAt,
    updatedAt: invitation.updatedAt,
  };
}
