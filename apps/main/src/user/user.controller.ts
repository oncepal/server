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
import { GetUsersDto } from 'libs/dtos/src';
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
  async user(@Body() user: Prisma.UserCreateInput, @Res() res: Response) {
    if (user?.phoneNumber) {
      const existingUser = await this.userService.findOneByPhoneNumber(
        user?.phoneNumber,
      );

      if (!existingUser) {
        const res = this.userService.create(user);
        return res;
      } else {
        return error(res, 500, '已存在该用户！');
      }
    } else return error(res, 500, '缺少手机号！');
  }

  /**
   * 查询匹配条件的用户
   * @query params 查询条件
   * @returns 满足条件的用户列表
   */
  @Public()
  @Get('users')
  async users(@Query() params: GetUsersDto): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;

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
  async updateUser(@Body() user) {
    return await this.userService.update(user);
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
   * @param id 用户id
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
