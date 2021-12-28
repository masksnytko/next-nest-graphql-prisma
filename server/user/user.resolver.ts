import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserInput } from './dto/user.input'
import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private user: UserService) {}

  @Query(() => [User])
  users() {
    return this.user.users()
  }

  @Mutation(() => User)
  addUser(@Args('data') data: UserInput) {
    return this.user.create(data)
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => ID }) id: string, @Args('data') data: UserInput) {
    return this.user.update({
      where: { id },
      data
    })
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.user.delete({ id: id })
  }

  @ResolveField(() => String)
  fullName(@Parent() user: User) {
    if (user.firstName && user.lastName) {
      return user.firstName + ' ' + user.lastName
    }

    return user.firstName || user.lastName
  }
}
