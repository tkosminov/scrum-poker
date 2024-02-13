import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vote } from './vote.entity';
import { VoteResolver } from './vote.resolver';
import { VoteService } from './vote.service';

const repositories = TypeOrmModule.forFeature([Vote]);

@Module({
  imports: [repositories],
  providers: [VoteResolver, VoteService],
  exports: [repositories],
})
export class VoteModule {}
