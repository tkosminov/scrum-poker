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
import { Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DateTimeISOResolver } from 'graphql-scalars';

import { Task } from '../task/task.entity';
import { RoomUser } from '../room-user/room-user.entity';

@ObjectType()
@Entity()
export class Room {
  @Field(() => ID, { filterable: true, sortable: true })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => DateTimeISOResolver, { sortable: true, filterable: true })
  @Index()
  @CreateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Field(() => DateTimeISOResolver, { sortable: true })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  /**
   * ! info
   */

  @Field(() => String, { filterable: true, sortable: true, nullable: true })
  @Index()
  @Column('character varying', { nullable: true })
  public title: string;

  /**
   * ! relations
   */

  @Field(() => ID, { filterable: true, sortable: true, nullable: true })
  @Index()
  @Column('uuid', { nullable: true })
  public current_task_id: string;

  @OneToOne(() => Task, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'current_task_id' })
  public current_task: Task;

  @OneToMany(() => Task, (task) => task.room)
  public tasks: Task[];

  @OneToMany(() => RoomUser, (room_user) => room_user.room)
  public room_users: RoomUser[];
}
