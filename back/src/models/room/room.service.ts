import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { RoomCreateDTO } from './mutation-input/create.dto';
import { RoomUpdateDTO } from './mutation-input/update.dto';
import { RoomDeleteDTO } from './mutation-input/delete.dto';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly room_repository: Repository<Room>) {}

  public async create(data: RoomCreateDTO) {
    const {
      raw: [room],
    }: { raw: [Room] } = await this.room_repository.createQueryBuilder().insert().values(data).returning('*').execute();

    return room;
  }

  public async update(data: RoomUpdateDTO) {
    const {
      raw: [room],
    }: { raw: [Room] } = await this.room_repository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where({
        id: data.id,
      })
      .returning('*')
      .execute();

    return room;
  }

  public async delete(data: RoomDeleteDTO) {
    const room = await this.room_repository.findOneOrFail({
      where: { id: data.id },
    });

    await this.room_repository.delete(room.id);

    return room;
  }
}
