import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class TaskCreateDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public room_id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
