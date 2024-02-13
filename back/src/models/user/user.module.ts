import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const repositories = TypeOrmModule.forFeature([User]);

@Module({
  imports: [repositories],
  providers: [UserResolver, UserService],
  exports: [repositories],
})
export class UserModule {}
