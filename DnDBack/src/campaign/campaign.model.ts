import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CampaignModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
