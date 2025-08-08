import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { AuthPayload } from './auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

@Mutation(() => AuthPayload)
async login(
  @Args('email') email: string,
  @Args('password') password: string,
): Promise<AuthPayload> {
  return this.authService.login(email, password);
}

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    const { token } = await this.authService.register(email, password, username);
    return token;
  }

  @Mutation(() => User)
  async confirmEmail(
    @Args('token', { type: () => String }) token: string,
  ): Promise<User> {
    return this.authService.confirmEmail(token);
  }
}
