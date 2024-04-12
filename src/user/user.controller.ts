import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Request,
  Post,
  UseGuards,
  Req,
  Query,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 创建用户
   * @body user 用户信息
   * @returns 创建好的用户信息
   */
  // @UseGuards(AuthGuard)
  @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() user: CreateUserDto) {

    if (user?.phoneNumber) {
      const existingUser = await this.userService.findOneByPhoneNumber(user?.phoneNumber)
      console.log("user",!existingUser);
      
      if (!existingUser) {
        const res = this.userService.create(user)
        return res;
      }else throw new Error()
    } else throw new Error()

  }

  /**
   * 查询匹配条件的用户
   * @query filter 查询条件
   * @returns 满足条件的用户列表
   */
  @Get()
  async findAll(@Query('filter') filter: string) {
    const f = JSON.parse(filter)
    const r = await this.userService.find(f)
    return r;
  }

  /**
   * 查询用户详情
   * @param id 用户id
   * @returns 用户详情对象
   */ 
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  } 

  /**
   * 修改用户信息
   * @param id 用户id
   * @body data 用户信息
   * @returns 修改后的用户信息
   */
  // @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() user: UpdateUserDto) {
    console.log(user);
    
    const r = await this.userService.update(user);
    if(!r) throw new Error()
    return r 
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns 修改成功与否
   */
  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const r = await this.userService.delete(id);
    return r
  }
}