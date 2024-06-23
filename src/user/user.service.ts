import { User } from './schemas/user.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
@Injectable()
export class UserService {

  @InjectModel(User.name) 
  private readonly userModel: Model<User>;

  async create(createUserDto: Partial<CreateUserDto>):Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save();
  }

  async find(skip:number,limit:number,query?: Partial<User>) {

    const findQuery = this.userModel
      .find(query)
      .sort({ _id: 1 })
      .skip(skip)
      .populate("author")
      .populate("categories");

    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.userModel.count();
    return { results, count };
  }
  
  async findOneById(id: string) {
    return await this.userModel.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await this.userModel.findOne({ phoneNumber }).exec();
  }
  async findOne(user: Record<string, any>) {
    return await this.userModel.findOne(user).exec();
  }
  async update(user: UpdateUserDto) {
    console.log('user.id', user);

    return await this.userModel
      .findByIdAndUpdate(user.id, user, { new: true })
      .exec();
  }
  async delete(id: string) {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return await this.userModel.deleteMany();
  }
}
