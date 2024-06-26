import { ID } from '@nestjs/graphql';

import {
  ObjectType,
  Field,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'nestjs-graphql-easy';
import { Index, OneToMany } from 'typeorm';
import { DateTimeISOResolver } from 'graphql-scalars';

import { RoomUser } from '../room-user/room-user.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { filterable: true, sortable: true, nullable: false })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => DateTimeISOResolver, { sortable: true, nullable: false })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Field(() => DateTimeISOResolver, { sortable: true, nullable: false })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  /**
   * ! info
   */

  @Field(() => String, { filterable: true, sortable: true, nullable: false })
  @Index()
  @Column('character varying', { nullable: false })
  public name: string;

  /**
   * ! relations
   */

  @OneToMany(() => RoomUser, (room_user) => room_user.user)
  public room_users: RoomUser[];
}
