import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<User>) {}

  create(user: CreateUserDto) {
    return this.model.create(user);
  }
   find(user?:Record<string,any>) {

    return this.model.find(user);
   
  }
  findOneById(id: string) {
    return this.model.findById(id);
  }
  findOne(user:Record<string,any>) {
    return this.model.findOne(user);
  }
  update(id: string, user: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}