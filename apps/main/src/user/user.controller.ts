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
import { Prisma, User as UserModel } from '@prisma/client';
import { Response } from 'express';
import { error, generateParseIntPipe, generateSkip } from '@libs/utils';
import { Public } from '@libs/decorators';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from '@libs/dtos';
import {
  PoliciesGuard,
  CheckPolicies,
  DeleteUserPolicyHandler,
} from '@libs/guards';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   * @body user 用户信息
   * @returns 创建好的用户信息
   */
  @Post('user')
  @Header('content-type', 'application/json')
  async user(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
  
      const existingUser = await this.userService.findOneByPhoneNumber(
        createUserDto.phoneNumber,
      );

      if (!existingUser) {
        const res = this.userService.create(createUserDto);
        return res;
      } else {
        return existingUser;
      }
   
  }

  /**
   * 查询匹配条件的用户
   * @query querys 查询条件
   * @returns 满足条件的用户列表
   */
  @Public()
  @Get('users')
  async users(@Query() querys: GetUsersDto): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = querys;

    return this.userService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 查询用户详情
   * @param id 用户id
   * @returns 用户详情对象
   */
  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  /**
   * 修改用户信息
   * @body 用户信息
   * @returns 修改后的用户信息
   */
  @Patch('user/:id')
  async updateUser(@Param('id') userId:string,@Body() updateUserDto:UpdateUserDto) {
    return await this.userService.updateUserById(userId,updateUserDto);
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns 删除成功与否
   */
  @Delete('user/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteUserPolicyHandler())
  async deleteUser(@Param('id') id: string) {
    const r = await this.userService.delete({ id });
    return r;
  }

  /**
   * 清空用户
   * @returns 删除成功与否
   */
  @Delete('users')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteUserPolicyHandler())
  async deleteUsers() {
    const r = await this.userService.deleteAll();
    return r;
  }
}
