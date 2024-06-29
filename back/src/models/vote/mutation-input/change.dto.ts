import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsUUID, IsIn } from 'class-validator';

import { POSSIBLE_POINTS } from '../vote.entity';

@InputType()
export class VoteChangeDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public task_id: string;

  @Field(() => Int, { nullable: false })
  @IsInt()
  @IsIn(POSSIBLE_POINTS)
  public point: number;
}
