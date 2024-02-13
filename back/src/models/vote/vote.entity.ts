import { ID, Int } from '@nestjs/graphql';

import {
  ObjectType,
  Field,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne } from 'typeorm';
import { DateTimeISOResolver } from 'graphql-scalars';

import { Task } from '../task/task.entity';
import { RoomUser } from '../room-user/room-user.entity';

@ObjectType()
@Entity()
@Index(['room_user_id', 'task_id'], { unique: true })
export class Vote {
  @Field(() => ID, { filterable: true, sortable: true })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => DateTimeISOResolver, { sortable: true })
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

  @Field(() => Int)
  @Column('integer', { nullable: false })
  public point: number;

  /**
   * ! relations
   */

  @Field(() => ID, { filterable: true, sortable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public room_user_id: string;

  @ManyToOne(() => RoomUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_user_id' })
  public room_user: RoomUser;

  @Field(() => ID, { filterable: true, sortable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public task_id: string;

  @ManyToOne(() => Task, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  public task: Task;
}
