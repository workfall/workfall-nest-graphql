import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './collections/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private user: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.user.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return await this.user.findById(id);
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.user(user);
    return await newUser.save();
  }
}
