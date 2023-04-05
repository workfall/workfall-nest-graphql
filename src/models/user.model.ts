import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('UserInput')
export class User {
  @Field(() => String, { nullable: true })
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field({ nullable: true })
  fullName: string;

  @Field({ nullable: true })
  username: string;
}
