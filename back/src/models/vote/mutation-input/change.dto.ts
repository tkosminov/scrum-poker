import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class VoteChangeDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public task_id: string;

  @Field(() => Int, { nullable: false })
  @IsInt()
  public point: number;
}
