import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from '../room/room.entity';
import { Vote } from '../vote/vote.entity';

import { EVotingStatusId, Task } from './task.entity';
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
    @InjectRepository(Vote) private readonly vote_repository: Repository<Vote>
  ) {}

  public async create(data: TaskCreateDTO) {
    const {
      raw: [task],
    }: { raw: [Task] } = await this.task_repository.createQueryBuilder().insert().values(data).returning('*').execute();

    await this.room_repository.update(task.room_id, { current_task_id: task.id });

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

    await this.task_repository.update(task.id, { voting_status_id: data.voting_status_id });

    if (data.voting_status_id === EVotingStatusId.NOT_STARTED) {
      await this.vote_repository.delete({ task_id: task.id });
    }

    return task;
  }

  public async setCurrent(data: TaskSetCurrentDTO) {
    const task = await this.task_repository.findOneOrFail({
      where: { id: data.id },
    });

    await this.room_repository.update(task.room_id, { current_task_id: task.id });

    return task;
  }
}
