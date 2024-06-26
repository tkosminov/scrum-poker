import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver, Subscription } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, Filter, Order, Pagination, ResolveField, Mutation } from 'nestjs-graphql-easy';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql/graphql.options';

import { Room } from './room.entity';
import { RoomService } from './room.service';
import { RoomCreateDTO } from './mutation-input/create.dto';
import { RoomUpdateDTO } from './mutation-input/update.dto';
import { RoomDeleteDTO } from './mutation-input/delete.dto';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  @Query(() => [Room])
  protected async rooms(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'rooms',
      entity: () => Room,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Room) _filter: unknown,
    @Order(() => Room) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @Mutation(() => Room)
  protected async roomCreate(@Args('data') data: RoomCreateDTO) {
    const room = await this.roomService.create(data);

    this.pubSub.publish('roomCreateEvent', { roomCreateEvent: room });

    return room;
  }

  @Subscription(() => Room)
  protected async roomCreateEvent() {
    return this.pubSub.asyncIterator('roomCreateEvent');
  }

  @Mutation(() => Room)
  protected async roomUpdate(@Args('data') data: RoomUpdateDTO) {
    const room = await this.roomService.update(data);

    this.pubSub.publish('roomUpdateEvent', { roomUpdateEvent: room, channel_ids: [null, room.id] });

    return room;
  }

  @Subscription(() => Room, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async roomUpdateEvent(@Args({ name: 'channel_id', type: () => ID, nullable: true }) _channel_id: string) {
    return this.pubSub.asyncIterator('roomUpdateEvent');
  }

  @Mutation(() => Room)
  protected async roomDelete(@Args('data') data: RoomDeleteDTO) {
    const room = await this.roomService.delete(data);

    this.pubSub.publish('roomDeleteEvent', { roomDeleteEvent: room, channel_ids: [null, room.id] });

    return room;
  }

  @Subscription(() => Room, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async roomDeleteEvent(@Args({ name: 'channel_id', type: () => ID, nullable: true }) _channel_id: string) {
    return this.pubSub.asyncIterator('roomDeleteEvent');
  }
}
