import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignModel } from './campaign.model';
import { mapCampaignToModel, mapInvitationToModel } from './campaign.mapper';
import { CampaignInvitationModel } from './campaign-invitation.model';

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

  async inviteUserToCampaign(
    data: { email: string; campaignId: number },
    invitedById: number,
  ): Promise<void> {
    const { email, campaignId } = data;

    // Vérifie si la campagne existe et que l'utilisateur est bien MJ
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        memberships: {
          where: {
            userId: invitedById,
            role: 'DM',
          },
        },
      },
    });

    if (!campaign || campaign.memberships.length === 0) {
      throw new Error('Unauthorized: you are not the DM of this campaign.');
    }

    // Crée l’invitation
    await this.prisma.campaignInvitation.create({
      data: {
        email,
        campaignId,
        invitedById,
      },
    });
  }

  async acceptInvitation(
    campaignId: number,
    email: string,
    userId: number,
  ): Promise<void> {
    // Vérifie qu’une invitation existe pour cet email et cette campagne
    const invitation = await this.prisma.campaignInvitation.findFirst({
      where: {
        campaignId,
        email,
        accepted: false,
      },
    });

    if (!invitation) {
      throw new Error('No invitation found or already accepted.');
    }

    // Vérifie que l'utilisateur n'est pas déjà membre
    const alreadyMember = await this.prisma.campaignMembership.findFirst({
      where: { campaignId, userId },
    });

    if (alreadyMember) {
      throw new Error('You are already a member of this campaign.');
    }

    // Ajoute à la campagne
    await this.prisma.campaignMembership.create({
      data: {
        campaignId,
        userId,
        role: 'PLAYER',
      },
    });

    // Marque l’invitation comme acceptée
    await this.prisma.campaignInvitation.update({
      where: { id: invitation.id },
      data: { accepted: true },
    });
  }

  async getPendingInvitations(
    userEmail: string,
  ): Promise<CampaignInvitationModel[]> {
    const invitations = await this.prisma.campaignInvitation.findMany({
      where: {
        email: userEmail,
        accepted: false,
      },
    });

    return invitations.map(mapInvitationToModel);
  }
}
