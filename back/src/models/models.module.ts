import { Global, Module } from '@nestjs/common';

import { RoomModule } from './room/room.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { RoomUserModule } from './room-user/room-user.module';
import { VoteModule } from './vote/vote.module';

@Global()
@Module({
  imports: [RoomModule, TaskModule, UserModule, RoomUserModule, VoteModule],
  providers: [],
  exports: [RoomModule, TaskModule, UserModule, RoomUserModule, VoteModule],
})
export class ModelsModule {}
