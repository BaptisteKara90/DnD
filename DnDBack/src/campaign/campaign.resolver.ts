import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { CampaignModel } from './campaign.model';
import { CampaignService } from './campaign.service';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JoinCampaignInput } from './dto/join-campaign.input';
import { CreateCampaignInvitationInput } from './dto/create-campaign-invitation.input';
import { CampaignInvitationModel } from './campaign-invitation.model';

@Resolver()
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => CampaignModel)
  @UseGuards(GqlAuthGuard)
  async createCampaign(
    @Args('data') data: CreateCampaignInput,
    @CurrentUser() user: any,
  ): Promise<CampaignModel> {
    return this.campaignService.createCampaign(data, user.id);
  }

  @Query(() => [CampaignModel])
  @UseGuards(GqlAuthGuard)
  async getUserCampaigns(@CurrentUser() user: any): Promise<CampaignModel[]> {
    return this.campaignService.getUserCampaigns(user.id);
  }

  @Mutation(() => CampaignModel)
  @UseGuards(GqlAuthGuard)
  async joinCampaign(
    @Args('data') data: JoinCampaignInput,
    @CurrentUser() user: any,
  ): Promise<CampaignModel> {
    return this.campaignService.joinCampaign(data.campaignId, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async inviteToCampaign(
    @Args('data') data: CreateCampaignInvitationInput,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    await this.campaignService.inviteUserToCampaign(data, user.id);
    return true;
  }

  @Query(() => [CampaignInvitationModel])
  @UseGuards(GqlAuthGuard)
  async myPendingInvitations(
    @CurrentUser() user: any,
  ): Promise<CampaignInvitationModel[]> {
    return this.campaignService.getPendingInvitations(user.email);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async declineInvitation(
    @Args('invitationId', { type: () => Int }) invitationId: number,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    return this.campaignService.declineInvitation(invitationId, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteInvitationAsDm(
    @Args('invitationId', { type: () => Int }) invitationId: number,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    return this.campaignService.deleteInvitationAsDm(invitationId, user.id);
  }
}
