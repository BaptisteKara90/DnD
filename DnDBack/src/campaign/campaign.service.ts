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

  async getPendingInvitations(
    userEmail: string,
  ): Promise<CampaignInvitationModel[]> {
    const invitations = await this.prisma.campaignInvitation.findMany({
      where: {
        email: userEmail,
        accepted: false,
      },
      include: {
        campaign: true,
        invitedBy: true,
      },
    });

    return invitations.map(mapInvitationToModel);
  }

  async acceptInvitation(
    invitationId: number,
    userId: number,
  ): Promise<CampaignInvitationModel> {
    const invitation = await this.prisma.campaignInvitation.findUnique({
      where: { id: invitationId },
      include: {
        campaign: true,
        invitedBy: true,
      },
    });

    if (!invitation || invitation.userId !== userId) {
      throw new Error(
        'Invitation introuvable ou non destinée à cet utilisateur.',
      );
    }

    if (invitation.accepted) {
      throw new Error('Cette invitation a déjà été acceptée.');
    }

    await this.prisma.$transaction([
      this.prisma.campaignInvitation.update({
        where: { id: invitationId },
        data: { accepted: true },
      }),
      this.prisma.campaignMembership.create({
        data: {
          campaignId: invitation.campaignId,
          userId: userId,
          role: 'PLAYER', // ou CampaignRole.PLAYER si tu utilises l'enum Prisma
        },
      }),
    ]);

    return mapInvitationToModel({
      ...invitation,
      accepted: true,
    });
  }
}
