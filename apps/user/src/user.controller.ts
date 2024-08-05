import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { Prisma,User } from '@prisma/client';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @MessagePattern('createUser')
  async createUser(createUserDTO: User) {
 
    
    const newUser = await this.userService.createUser(createUserDTO);
    return newUser;
  }
}
