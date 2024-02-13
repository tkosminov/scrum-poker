import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomUser } from './room-user.entity';
import { RoomUserResolver } from './room-user.resolver';
import { RoomUserService } from './room-user.service';

const repositories = TypeOrmModule.forFeature([RoomUser]);

@Module({
  imports: [repositories],
  providers: [RoomUserResolver, RoomUserService],
  exports: [repositories],
})
export class RoomUserModule {}
