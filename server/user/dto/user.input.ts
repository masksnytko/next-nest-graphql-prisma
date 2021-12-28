import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UserInput {
  @Field(() => String)
  email: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string
}