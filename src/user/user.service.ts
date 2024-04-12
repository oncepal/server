import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto,UpdateUserDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(user: Partial<CreateUserDto>) {

    return await this.model.create(user);
  }
   async find(user?:{}) {
    const users = await this.model.find(user).exec();
    
    return users;
   
  } 
  async findOneById(id: string) {
    return await this.model.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await  this.model.findOne({phoneNumber}).exec();
  }
  async findOne(user:Record<string,any>) {
    return await  this.model.findOne(user).exec();
  }
  async update( user: UpdateUserDto) {
    console.log("user.id",user);
     
    return await this.model.findByIdAndUpdate(user.id, user, { new: true }).exec();
  }
  async delete(id: string) {
    return await this.model.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return await this.model.deleteMany();
  }
}