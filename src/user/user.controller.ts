import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User } from './schemas/user.schema';
import { CreateUserDto, UserProfileDto } from './dto/user.dto';
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
    @Get()
    findAll() {
      const users =  this.userService.findAll();
      return users.getQuery().map(u=>{
        const userProfile = new UserProfileDto();
        userProfile.name = u.name;
        userProfile.email = u.wxAccount;
        return userProfile
      })
    }
    @Get('/:id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
    @Patch('/:id')
    update(@Param('id') id: string, @Body() data: User) {
      return this.userService.update(id, data);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.delete(id);
    }
  }