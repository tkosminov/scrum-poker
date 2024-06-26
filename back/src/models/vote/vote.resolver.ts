import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, ID, Resolver, Subscription } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Mutation, Order, Pagination, Query } from 'nestjs-graphql-easy';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql-pub-sub/graphql-pub-sub.module';
import { CurrentUserGql } from '../../oauth/oauth.decorator';

import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteChangeDTO } from './mutation-input/change.dto';
import { VoteChangeOjectDTO } from './mutation-output/change.dto';

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

  @Mutation(() => VoteChangeOjectDTO)
  protected async voteChange(@CurrentUserGql() current_user: IJwtPayload, @Args('data') data: VoteChangeDTO) {
    const { vote, room_id } = await this.voteService.change(current_user, data);

    this.pubSub.publish('voteChangeEvent', { voteChangeEvent: vote, channel_ids: [room_id] });

    return vote;
  }

  @Subscription(() => VoteChangeOjectDTO, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async voteChangeEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('voteChangeEvent');
  }
}
