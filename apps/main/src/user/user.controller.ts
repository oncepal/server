import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  Req,
  Query,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Header,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Response } from 'express';
import { error, generateParseIntPipe, generateSkip } from '@libs/utils';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 创建用户
   * @body userInfo 用户信息
   * @returns 创建好的用户信息
   */
  @Post()
  @Header('content-type', 'application/json')
  async createUser(@Body() userInfo: CreateUserDto, @Res() res: Response) {
    if (userInfo?.phoneNumber) {
      const existingUser = await this.userService.findOneByPhoneNumber(
        userInfo?.phoneNumber,
      );

      if (!existingUser) {
        const res = this.userService.create(userInfo);
        return res;
      } else {
        return  error(res, 500, '已存在该用户！');
      }
    } else return  error(res, 500, '缺少手机号！');
  }



  /**
   * 查询匹配条件的用户
   * @query filter 查询条件
   * @returns 满足条件的用户列表
   */
  @Get()
  async getUsers(
    @Query('page', generateParseIntPipe('page')) page: number,
    @Query('pageSize', generateParseIntPipe('pageSize')) pageSize: number,
    @Query('phoneNumber') phoneNumber: string,
    @Query('name') name: string,
  ) {
    const query = {
      phoneNumber,
      name
    }
    const skip = generateSkip(page,pageSize)
    const r = await this.userService.find(skip,pageSize,query);
    return r;
  }

  /**
   * 查询用户详情
   * @param id 用户id
   * @returns 用户详情对象
   */
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  /**
   * 修改用户信息
   * @body 用户信息
   * @returns 修改后的用户信息
   */
  @Patch()
  async updateUser(@Body() user: UpdateUserDto) {

    const r = await this.userService.update(user);
    if (!r) throw new Error();
    return r;
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns 删除成功与否
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const r = await this.userService.delete(id);
    return r;
  }
}
