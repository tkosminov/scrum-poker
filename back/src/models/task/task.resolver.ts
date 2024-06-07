import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver, Subscription } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, Filter, Order, Pagination, ResolveField, Mutation } from 'nestjs-graphql-easy';
import { DataSource } from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql/graphql.options';
import { Vote } from '../vote/vote.entity';

import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskCreateDTO } from './mutation-input/create.dto';
import { TaskUpdateDTO } from './mutation-input/update.dto';
import { TaskDeleteDTO } from './mutation-input/delete.dto';
import { TaskChangeStatusDTO } from './mutation-input/change-status.dto';
import { TaskSetCurrentDTO } from './mutation-input/set-current.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  @Query(() => [Task])
  public async tasks(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'tasks',
      entity: () => Task,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Task) _filter: unknown,
    @Order(() => Task) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => [Vote], { nullable: true })
  public async votes(
    @Parent() task: Task,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'votes',
      entity: () => Vote,
      entity_fk_key: 'task_id',
    })
    field_alias: string,
    @Filter(() => Vote) _filter: unknown,
    @Order(() => Vote) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ): Promise<Vote[]> {
    return await ctx[field_alias].load(task.id);
  }

  @Mutation(() => Task)
  protected async taskCreate(@Args('data') data: TaskCreateDTO) {
    const task = await this.taskService.create(data);

    this.pubSub.publish('taskCreateEvent', { taskCreateEvent: task, channel_ids: [task.room_id] });

    return task;
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async taskCreateEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('taskCreateEvent');
  }

  @Mutation(() => Task)
  protected async taskUpdate(@Args('data') data: TaskUpdateDTO) {
    const task = await this.taskService.update(data);

    this.pubSub.publish('taskUpdateEvent', { taskUpdateEvent: task, channel_ids: [task.room_id] });

    return task;
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async taskUpdateEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('taskUpdateEvent');
  }

  @Mutation(() => Task)
  protected async taskDelete(@Args('data') data: TaskDeleteDTO) {
    const task = await this.taskService.delete(data);

    this.pubSub.publish('taskDeleteEvent', { taskDeleteEvent: task, channel_ids: [task.room_id] });

    return task;
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async taskDeleteEvent(@Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string) {
    return this.pubSub.asyncIterator('taskDeleteEvent');
  }

  @Mutation(() => Task)
  protected async taskChangeStatus(@Args('data') data: TaskChangeStatusDTO) {
    const task = await this.taskService.changeStatus(data);

    this.pubSub.publish('taskChangeStatusEvent', { taskChangeStatusEvent: task, channel_ids: [task.room_id] });

    return task;
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async taskChangeStatusEvent(
    @Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string
  ) {
    return this.pubSub.asyncIterator('taskChangeStatusEvent');
  }

  @Mutation(() => Task)
  protected async taskSetCurrent(@Args('data') data: TaskSetCurrentDTO) {
    const task = await this.taskService.setCurrent(data);

    this.pubSub.publish('taskSetCurrentEvent', { taskSetCurrentEvent: task, channel_ids: [task.room_id] });

    return task;
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => payload.channel_ids.includes(variables.channel_id),
  })
  protected async taskSetCurrentEvent(
    @Args({ name: 'channel_id', type: () => ID, nullable: false }) _channel_id: string
  ) {
    return this.pubSub.asyncIterator('taskSetCurrentEvent');
  }
}
