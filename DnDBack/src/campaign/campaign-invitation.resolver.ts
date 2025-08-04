import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CampaignInvitationModel } from './campaign-invitation.model';

@Resolver()
export class CampaignInvitationResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => CampaignInvitationModel)
  @UseGuards(GqlAuthGuard)
  async acceptInvitation(
    @Args('invitationId', { type: () => Int }) invitationId: number,
    @CurrentUser() user: any,
  ): Promise<CampaignInvitationModel> {
    return this.campaignService.acceptInvitation(
      invitationId,
      user.id,
      user.email,
    );
  }

  @Query(() => [CampaignInvitationModel])
  @UseGuards(GqlAuthGuard)
  async pendingInvitations(
    @CurrentUser() user: any,
  ): Promise<CampaignInvitationModel[]> {
    return this.campaignService.getPendingInvitations(user.email);
  }
}
