import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsUUID } from 'class-validator';
import { EVotePoint } from '../vote.entity';

@InputType()
export class VoteChangeDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public task_id: string;

  @Field(() => EVotePoint, { nullable: false })
  @IsEnum(EVotePoint)
  public point: EVotePoint;
}
