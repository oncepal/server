import {
  Body,
  Request,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Delete,
  Param,
  Patch,
  Req,
  Query,
  Inject,
} from '@nestjs/common';
import { DemandService } from './demand.service';

import { CreateDemandDto, UpdateDemandDto } from '@libs/dtos';
import { AuthGuard } from '@libs/guards';
import { Public } from '@libs/decorators';
import { generateParseIntPipe, generateSkip } from '@libs/utils';
import { UserService } from '../user/user.service';

@Controller()
export class DemandController {
  @Inject()
  private readonly palService: DemandService;
  @Inject()
  private readonly userService: UserService;
  /**
   * 开一个搭子盲盒
   * @param id 搭子需求id
   * @returns 用户详情对象
   */
  // @Get('random')
  // async getRandom(
  //   @Query('userId') userId: string,
  //   @Query('type') type: number,
  // ) {
  //   const userInfo = await this.userService.findOneById(userId);
  //   const query = {};

  //   if (type == 1) {
  //     // 高级盲盒有条件筛选根据userInfo
  //   }
  //   const matchedUserInfo = await this.userService.findOne(query);
  //   return matchedUserInfo;
  // }

  /**
   * @name 新建搭子需求
   * @Body createDemandDto CreateDemandDto
   */
  @Post('demand')
  async createDemand(@Body() createDemandDto: CreateDemandDto) {
    return this.palService.create(createDemandDto);
  }

  /**
   * @name 查询匹配条件的搭子需求
   * @query page 第几页
   * @query pageSize 多少条
   * @query time 时间筛选
   * @query keyword 关键词筛选
   * @query location 位置筛选
   * @returns 满足条件的需求列表
   */
  @Public()
  @Get('demands')
  async getDemands(
    @Query('page',  generateParseIntPipe('page')) page: number,
    @Query('pageSize',  generateParseIntPipe('pageSize')) pageSize: number,
    @Query('time') time: string,
    @Query('location') location: string,
    @Query('keyword') keyword: string,
  ) {

    const query = {
      keyword,
      location,
      time,
    };
    const skip =  generateSkip(page, pageSize);
    const r = await this.palService.find(skip, pageSize, query);
    return r;
  }

  /**
   * 获取搭子需求详情
   * @param id 搭子需求id
   * @returns 用户详情对象
   */
  @Get('demand/:id')
  async getDemand(@Param('id') id: string) {
    return await this.palService.findOneById(id);
  }

  /**
   * 修改搭子需求信息
   * @body 搭子需求信息
   * @returns 修改后的搭子需求信息
   */
  @Patch('demand')
  async updateDemand(@Body() demand: UpdateDemandDto) {
    const r = await this.palService.update(demand);
    if (!r) throw new Error();
    return r;
  }

  /**
   * 删除搭子需求
   * @param id 搭子需求id
   * @returns 删除成功与否
   */

  @Delete('demand/:id')
  async deleteDemand(@Param('id') id: string) {
    const r = await this.palService.delete(id);
    return r;
  }
}
