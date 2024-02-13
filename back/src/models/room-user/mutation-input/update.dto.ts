import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class RoomUserUpdateDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public room_id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
