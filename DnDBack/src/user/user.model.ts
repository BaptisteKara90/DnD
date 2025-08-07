import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  isConfirmed: boolean;
}
