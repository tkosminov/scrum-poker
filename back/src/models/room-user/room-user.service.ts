import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GRAPHQL_SUBSCRIPTION } from '../../graphql-pub-sub/graphql-pub-sub.module';
import { pluck } from '../../helpers/array.helper';

import { RoomUser } from './room-user.entity';
import { RoomUserCreateDTO } from './mutation-input/create.dto';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser) private readonly room_user_repository: Repository<RoomUser>,
    @Inject(GRAPHQL_SUBSCRIPTION) private readonly pubSub: RedisPubSub
  ) {}

  public async join(current_user: IJwtPayload, data: RoomUserCreateDTO) {
    const {
      raw: [room_user],
    }: { raw: [RoomUser] } = await this.room_user_repository
      .createQueryBuilder()
      .insert()
      .values({ ...data, connected: true, user_id: current_user.id })
      .orUpdate(['connected'], ['user_id', 'room_id'])
      .returning('*')
      .execute();

    return room_user;
  }

  public async leave(current_user: IJwtPayload, data: RoomUserCreateDTO) {
    const room_user = await this.room_user_repository.findOneOrFail({
      where: { room_id: data.room_id, user_id: current_user.id },
    });

    room_user.connected = false;

    await this.room_user_repository.update(room_user.id, { connected: false });

    return room_user;
  }

  public async onDisconnect(current_user: IJwtPayload) {
    const room_users = await this.room_user_repository.find({
      where: { user_id: current_user.id, connected: true },
    });

    const room_user_ids = pluck(room_users, 'id');

    await this.room_user_repository.update({ id: In(room_user_ids) }, { connected: false });

    await Promise.all(
      room_users.map((room_user) => {
        room_user.connected = false;

        return this.pubSub.publish('roomUserLeaveEvent', {
          roomUserLeaveEvent: room_user,
          channel_ids: [room_user.room_id],
        });
      })
    );
  }
}
