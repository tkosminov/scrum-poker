import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class TaskUpdateDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
