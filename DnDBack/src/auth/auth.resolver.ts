import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const { token } = await this.authService.login(email, password);
    return token;
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

  @Mutation(()=> User)
  async confirmEmail(
    @Args('token', { type: () => String }) token: string,
  ): Promise<User> {
    return this.authService.confirmEmail(token);
  }
}
