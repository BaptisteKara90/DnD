import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CampaignInvitationModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  campaignId: number;

  @Field()
  email: string;

  @Field(() => Boolean)
  accepted: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
