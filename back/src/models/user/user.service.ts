import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserUpdateDTO } from './mutation-input/update.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user_repository: Repository<User>) {}

  public async findOne(id: string) {
    return await this.user_repository.findOneOrFail({
      where: { id },
    });
  }

  public async update(current_user: IJwtPayload, data: UserUpdateDTO) {
    const user = await this.user_repository.findOneOrFail({
      where: { id: current_user.id },
    });

    user.name = data.name;

    await this.user_repository.update(user.id, data);

    return user;
  }
}
