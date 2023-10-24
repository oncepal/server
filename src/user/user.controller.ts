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
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    create(@Body() user: User) {
      return this.userService.create(user);
    }
    @Get()
    findAll() {
      return this.userService.findAll();
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