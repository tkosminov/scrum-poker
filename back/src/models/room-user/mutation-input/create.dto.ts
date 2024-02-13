import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class RoomUserCreateDTO {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  public room_id: string;
}
