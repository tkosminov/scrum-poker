import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

import { RoomUserUpdateDTO } from './mutation-input/update.dto';
import { RoomUser } from './room-user.entity';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser) private readonly room_user_repository: Repository<RoomUser>,
    @InjectRepository(User) private readonly user_repository: Repository<User>
  ) {}

  public async update(current_user: IJwtPayload, data: RoomUserUpdateDTO) {
    const room_user = await this.room_user_repository.findOneOrFail({
      where: { room_id: data.room_id, user_id: current_user.id },
    });

    await this.user_repository.update(room_user.user_id, { name: data.name });

    return room_user;
  }
}
