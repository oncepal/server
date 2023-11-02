import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<User>) {}

  create(user: CreateUserDto) {
    return this.model.create(user);
  }
  findAll() {
    return this.model.find();
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  update(id: string, user: User) {
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}