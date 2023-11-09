import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto,UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() user: CreateUserDto ) {
    return this.userService.create(user);
  }
 
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}