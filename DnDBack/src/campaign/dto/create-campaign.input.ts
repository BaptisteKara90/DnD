import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCampaignInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
