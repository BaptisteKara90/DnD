import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsInt } from 'class-validator';

@InputType()
export class CreateCampaignInvitationInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsInt()
  campaignId: number;
}
