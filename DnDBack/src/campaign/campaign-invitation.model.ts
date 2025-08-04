import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CampaignInvitationModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  campaignId: number;

  @Field()
  campaignName: string;

  @Field()
  email: string;

  @Field(() => Boolean)
  accepted: boolean;

  @Field()
  invitedByUsername: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
