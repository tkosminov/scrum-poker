import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '../task/task.entity';

import { Vote } from './vote.entity';
import { VoteChangeDTO } from './mutation-input/change.dto';
import { RoomUser } from '../room-user/room-user.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Task) private readonly task_repository: Repository<Task>,
    @InjectRepository(RoomUser) private readonly room_user_repository: Repository<RoomUser>,
    @InjectRepository(Vote) private readonly vote_repository: Repository<Vote>
  ) {}

  public async change(current_user: IJwtPayload, data: VoteChangeDTO) {
    const task = await this.task_repository.findOneOrFail({
      where: { id: data.task_id },
    });

    const room_user = await this.room_user_repository.findOneOrFail({
      where: { room_id: task.room_id, user_id: current_user.id },
    });

    const {
      raw: [vote],
    }: { raw: [Vote] } = await this.vote_repository
      .createQueryBuilder()
      .insert()
      .values({ ...data, room_user_id: room_user.id })
      .orUpdate(['point'], ['task_id', 'room_user_id'])
      .returning('*')
      .execute();

    return { vote: { task_id: vote.task_id, room_user_id: vote.room_user_id }, room_id: task.room_id };
  }
}
