import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UserUpdateDTO {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
