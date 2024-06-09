import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver, Subscription } from '@nestjs/graphql';

import { ELoaderType, Loader, Mutation, ResolveField } from 'nestjs-graphql-easy';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql/graphql.options';
import { CurrentUserGql } from '../../oauth/oauth.decorator';
import { User } from '../user/user.entity';

import { RoomUser } from './room-user.entity';
import { RoomUserService } from './room-user.service';
import { RoomUserCreateDTO } from './mutation-input/create.dto';

@Resolver(() => RoomUser)
export class RoomUserResolver {
  constructor(
    private readonly roomUserService: RoomUserService,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  @ResolveField(() => User, { nullable: false })
  protected async user(
    @Parent() room_user: RoomUser,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(room_user.user_id);
  }

  @Mutation(() => RoomUser)
  protected async roomUserJoin(@CurrentUserGql() current_user: IJwtPayload, @Args('data') data: RoomUserCreateDTO) {
    const room_user = await this.roomUserService.join(current_user, data);

    this.pubSub.publish('roomUserJoinEvent', { roomUserJoinEvent: room_user, channel_ids: [room_user.room_id] });
  }

  @Subscription(() => RoomUser, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async roomUserJoinEvent(
    @Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string
  ) {
    return this.pubSub.asyncIterator('roomUserJoinEvent');
  }

  @Mutation(() => RoomUser)
  protected async roomUserLeave(@CurrentUserGql() current_user: IJwtPayload, @Args('data') data: RoomUserCreateDTO) {
    const room_user = await this.roomUserService.leave(current_user, data);

    this.pubSub.publish('roomUserLeaveEvent', { roomUserLeaveEvent: room_user, channel_ids: [room_user.room_id] });
  }

  @Subscription(() => RoomUser, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async roomUserLeaveEvent(
    @Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string
  ) {
    return this.pubSub.asyncIterator('roomUserLeaveEvent');
  }
}
