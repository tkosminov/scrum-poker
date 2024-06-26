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
import { Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DateTimeISOResolver } from 'graphql-scalars';

import { User } from '../user/user.entity';
import { Room } from '../room/room.entity';
import { Vote } from '../vote/vote.entity';

@ObjectType()
@Entity()
@Index(['user_id', 'room_id'], { unique: true })
export class RoomUser {
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

  @Field(() => Boolean, { filterable: true, sortable: true, nullable: false })
  @Index()
  @Column('boolean', { nullable: false, default: false })
  public connected: boolean;

  /**
   * ! relations
   */

  @Field(() => ID, { filterable: true, sortable: true, nullable: false })
  @Index()
  @Column('uuid', { nullable: false })
  public room_id: string;

  @ManyToOne(() => Room, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  public room: Room;

  @Field(() => ID, { filterable: true, sortable: true, nullable: false })
  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @OneToMany(() => Vote, (vote) => vote.room_user)
  public votes: Vote[];
}
