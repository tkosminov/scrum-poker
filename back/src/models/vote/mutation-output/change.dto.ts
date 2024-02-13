import { Field, ID } from '@nestjs/graphql';
import { ObjectType } from 'nestjs-graphql-easy';

@ObjectType()
export class VoteChangeOjectDTO {
  @Field(() => ID, { nullable: false })
  public task_id: string;

  @Field(() => ID, { nullable: false })
  public room_user_id: string;
}
