import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { EVotingStatusId } from '../task.entity';

@InputType()
export class TaskChangeStatusDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public id: string;

  @Field(() => EVotingStatusId, { nullable: false })
  @IsEnum(EVotingStatusId)
  public voting_status_id: EVotingStatusId;
}
