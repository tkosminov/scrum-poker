import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class TaskSetCurrentDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public id: string;
}
