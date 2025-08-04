// src/campaign/campaign.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CampaignModel } from './campaign.model';
import { CampaignService } from './campaign.service';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

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
}
