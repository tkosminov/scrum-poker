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

  public async currentUserVote(user_id: string, task_id: string) {
    const [res]: Vote[] = await this.vote_repository
      .createQueryBuilder('vote')
      .select('vote.*')
      .innerJoin('vote.room_user', 'room_user')
      .where('room_user.user_id = :user_id', { user_id })
      .andWhere('vote.task_id = :task_id', { task_id })
      .execute();

    return res;
  }

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

    return { vote, room_id: task.room_id };
  }
}
