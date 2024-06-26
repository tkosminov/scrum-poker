import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomUser } from './room-user.entity';
import { RoomUserCreateDTO } from './mutation-input/create.dto';

@Injectable()
export class RoomUserService {
  constructor(@InjectRepository(RoomUser) private readonly room_user_repository: Repository<RoomUser>) {}

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
}
