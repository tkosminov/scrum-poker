import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

const repositories = TypeOrmModule.forFeature([Room]);

@Module({
  imports: [repositories],
  providers: [RoomResolver, RoomService],
  exports: [repositories],
})
export class RoomModule {}
