import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }

  @Mutation(() => User)
  async confirmEmail(@Args('token', { type: () => String }) token: string): Promise<User> {
    return this.userService.confirmEmail(token);
  }
}
