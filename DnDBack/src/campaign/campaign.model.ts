import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CampaignRole } from '@prisma/client';

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

  @Field(() => Int)
  ownerId: number;

  @Field(() => CampaignRole)
  role: CampaignRole;
}
