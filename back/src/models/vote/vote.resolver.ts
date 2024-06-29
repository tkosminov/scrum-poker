import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver, Subscription } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Mutation, Order, Pagination, Query, ResolveField } from 'nestjs-graphql-easy';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql-pub-sub/graphql-pub-sub.module';
import { CurrentUserGql } from '../../oauth/oauth.decorator';

import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteChangeDTO } from './mutation-input/change.dto';
import { RoomUser } from '../room-user/room-user.entity';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(
    private readonly voteService: VoteService,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  @Query(() => [Vote])
  public async votes(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'votes',
      entity: () => Vote,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Vote) _filter: unknown,
    @Order(() => Vote) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @Query(() => Vote, { nullable: true })
  public async voteCurrent(
    @CurrentUserGql() current_user: IJwtPayload,
    @Args({ name: 'task_id', type: () => ID, nullable: false }) task_id: string
  ) {
    return this.voteService.currentUserVote(current_user.id, task_id);
  }

  @ResolveField(() => RoomUser, { nullable: false })
  public async room_user(
    @Parent() vote: Vote,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'room_user',
      entity: () => RoomUser,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ): Promise<Vote[]> {
    return await ctx[field_alias].load(vote.room_user_id);
  }

  @Mutation(() => Vote)
  protected async voteChange(@CurrentUserGql() current_user: IJwtPayload, @Args('data') data: VoteChangeDTO) {
    const { vote, room_id } = await this.voteService.change(current_user, data);

    this.pubSub.publish('voteChangeEvent', { voteChangeEvent: vote, channel_ids: [room_id] });

    return vote;
  }

  @Subscription(() => Vote, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async voteChangeEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('voteChangeEvent');
  }

  @Subscription(() => [Vote], {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async votesGetEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('votesGetEvent');
  }
}
