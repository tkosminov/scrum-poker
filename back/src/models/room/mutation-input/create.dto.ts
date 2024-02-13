import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class RoomCreateDTO {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
