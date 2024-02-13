import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RoomUpdateDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
