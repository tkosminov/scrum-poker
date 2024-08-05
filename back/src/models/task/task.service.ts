import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { findClosestNumbers } from '../../helpers/array.helper';
import { Room } from '../room/room.entity';
import { POSSIBLE_POINTS, Vote } from '../vote/vote.entity';
import { GRAPHQL_SUBSCRIPTION } from '../../graphql-pub-sub/graphql-pub-sub.module';

import { EVotingStatusId, IPointCount, Task } from './task.entity';
import { TaskCreateDTO } from './mutation-input/create.dto';
import { TaskUpdateDTO } from './mutation-input/update.dto';
import { TaskDeleteDTO } from './mutation-input/delete.dto';
import { TaskChangeStatusDTO } from './mutation-input/change-status.dto';
import { TaskSetCurrentDTO } from './mutation-input/set-current.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Room) private readonly room_repository: Repository<Room>,
    @InjectRepository(Task) private readonly task_repository: Repository<Task>,
    @InjectRepository(Vote) private readonly vote_repository: Repository<Vote>,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  public async create(data: TaskCreateDTO) {
    const {
      raw: [task],
    }: { raw: [Task] } = await this.task_repository.createQueryBuilder().insert().values(data).returning('*').execute();

    return task;
  }

  public async update(data: TaskUpdateDTO) {
    const {
      raw: [task],
    }: { raw: [Task] } = await this.task_repository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where({
        id: data.id,
      })
      .returning('*')
      .execute();

    return task;
  }

  public async delete(data: TaskDeleteDTO) {
    const task = await this.task_repository.findOneOrFail({
      where: { id: data.id },
    });

    await this.task_repository.delete(task.id);

    return task;
  }

  public async changeStatus(data: TaskChangeStatusDTO) {
    const task = await this.task_repository.findOneOrFail({
      where: { id: data.id },
    });

    task.voting_status_id = data.voting_status_id;

    switch (data.voting_status_id) {
      case EVotingStatusId.COMPLETED:
        const res = await this.calculateFinalPoint(task.id);

        task.avg_point = res.avg_point;
        task.closest_point = res.closest_point;
        task.counts_point = await this.calculateChartPoint(task.id);

        const votes = await this.vote_repository.find({ where: { task_id: task.id } });

        await this.pubSub.publish('votesGetEvent', {
          votesGetEvent: votes,
          channel_ids: [task.room_id],
        });

        break;
      default:
        await this.vote_repository.delete({ task_id: task.id });

        task.avg_point = null;
        task.closest_point = null;
        task.counts_point = null;

        break;
    }

    await this.task_repository.update(task.id, {
      voting_status_id: task.voting_status_id,
      avg_point: task.avg_point,
      closest_point: task.closest_point,
      counts_point: task.counts_point,
    });

    return task;
  }

  private async calculateChartPoint(task_id: string) {
    const points: Array<{ point: number }> = await this.vote_repository
      .createQueryBuilder('vote')
      .select('vote.point', 'point')
      .where({
        task_id,
      })
      .execute();

    const count = points.length;

    return points.reduce<Record<string, IPointCount>>((acc, curr) => {
      const key = `${curr.point}`;

      if (!acc[key]) {
        acc[key] = {
          count: 0,
          percent: 0,
        };
      }

      acc[key].count++;
      acc[key].percent = Number((acc[key].count / count).toFixed(1));

      return acc;
    }, {});
  }

  private async calculateFinalPoint(task_id: string) {
    const [res]: [{ avg_point: string }] = await this.vote_repository
      .createQueryBuilder('vote')
      .select('COALESCE(ROUND(AVG(NULLIF(vote.point, 0)), 1), 0)', 'avg_point')
      .where({
        task_id,
      })
      .execute();

    const avg_point = Number(res.avg_point);

    const closest_points = findClosestNumbers(POSSIBLE_POINTS, avg_point);

    if (closest_points.length === 1) {
      return {
        avg_point: avg_point,
        closest_point: closest_points[0],
      };
    }

    const left_diff = avg_point - closest_points[0];
    const right_diff = closest_points[1] - avg_point;

    return {
      avg_point: avg_point,
      closest_point: left_diff < right_diff ? closest_points[0] : closest_points[1],
    };
  }

  public async setCurrent(data: TaskSetCurrentDTO) {
    const task = await this.task_repository.findOneOrFail({
      where: { id: data.id },
    });

    await this.room_repository.update(task.room_id, { current_task_id: task.id });

    return task;
  }
}
