import { Float, ID, Int } from '@nestjs/graphql';

import {
  ObjectType,
  Field,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  registerEnumType,
} from 'nestjs-graphql-easy';
import { Index, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DateTimeISOResolver, JSONResolver } from 'graphql-scalars';

import { Room } from '../room/room.entity';
import { Vote } from '../vote/vote.entity';

export interface IPointCount {
  count: number;
  percent: number;
}

export enum EVotingStatusId {
  NOT_STARTED = '1',
  IN_PROGRESS = '2',
  COMPLETED = '3',
}

registerEnumType(EVotingStatusId, {
  name: 'EVotingStatusId',
});

@ObjectType()
@Entity()
export class Task {
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
   * ! Info
   */

  @Field(() => String, { filterable: true, sortable: true, nullable: false })
  @Index()
  @Column('character varying', { nullable: false })
  public title: string;

  @Field(() => EVotingStatusId, { nullable: false })
  @Index()
  @Column('enum', { enum: EVotingStatusId, nullable: false, default: EVotingStatusId.NOT_STARTED })
  public voting_status_id: EVotingStatusId;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  public closest_point: number;

  @Field(() => Float, { nullable: true })
  @Column('double precision', { nullable: true })
  public avg_point: number;

  @Field(() => JSONResolver, { nullable: true })
  @Column('jsonb', { nullable: true })
  public counts_point: Record<string, IPointCount>;

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

  @OneToMany(() => Vote, (vote) => vote.room_user)
  public votes: Vote[];

  @OneToOne(() => Room, (_room) => _room.current_task)
  public _room: Room;
}
