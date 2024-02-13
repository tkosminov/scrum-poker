import { Args, Context, GraphQLExecutionContext, Resolver } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, Filter, Order, Pagination, Mutation } from 'nestjs-graphql-easy';
import { CurrentUserGql } from '../../oauth/oauth.decorator';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserUpdateDTO } from './mutation-input/update.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async users(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'users',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => User) _filter: unknown,
    @Order(() => User) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @Query(() => User)
  public async currentUser(@CurrentUserGql() current_user: IJwtPayload) {
    return this.userService.findOne(current_user.id);
  }

  @Mutation(() => User)
  protected async userUpdate(@CurrentUserGql() current_user: IJwtPayload, @Args('data') data: UserUpdateDTO) {
    return this.userService.update(current_user, data);
  }
}
