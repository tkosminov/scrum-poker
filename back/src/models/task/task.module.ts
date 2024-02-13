import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

const repositories = TypeOrmModule.forFeature([Task]);

@Module({
  imports: [repositories],
  providers: [TaskResolver, TaskService],
  exports: [repositories],
})
export class TaskModule {}
