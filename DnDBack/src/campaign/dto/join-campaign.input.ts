import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class JoinCampaignInput {
  @Field(() => Int)
  campaignId: number;
}
