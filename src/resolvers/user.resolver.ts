import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import { User } from 'src/models/user.model';
import { User as UserSchema } from 'src/collections/user.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly appService: AppService) {}
  @Query(() => User)
  async getUser(@Args('id', { type: () => String }) id: string) {
    return await this.appService.getUser(id);
  }

  @Query(() => [User])
  async getUsers() {
    return await this.appService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('user', { type: () => User }) user: UserSchema) {
    const createdUser = await this.appService.createUser(user);
    pubSub.publish('newUser', { newUser: createdUser });
    return createdUser;
  }

  @Subscription(() => User)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}
