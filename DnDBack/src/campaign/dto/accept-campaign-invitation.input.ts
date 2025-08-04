import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AcceptCampaignInvitationInput {
  @Field(() => Int)
  campaignId: number;
}
