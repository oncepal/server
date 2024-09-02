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
import { PalService } from './pal.service';

import { CreateNeedDto, UpdateNeedDto } from './dto/need.dto';
import { AuthGuard } from '@libs/guards';
import { Public } from '@libs/decorators';
import { generateParseIntPipe, generateSkip } from '@libs/utils';
import { UserService } from '../user/user.service';
@Controller('pal')
export class PalController {
  @Inject()
  private readonly palService: PalService;
  @Inject()
  private readonly userService: UserService;
  /**
   * 开一个搭子盲盒
   * @param id 搭子需求id
   * @returns 用户详情对象
   */
  @Get('random')
  async getRandom(
    @Query('userId') userId: string,
    @Query('type') type: number,
  ) {
    const userInfo = await this.userService.findOneById(userId);
    const query = {};

    if (type == 1) {
      // 高级盲盒有条件筛选根据userInfo
    }
    const matchedUserInfo = await this.userService.findOne(query);
    return matchedUserInfo;
  }

  /**
   * @name 新建搭子需求
   * @Body createNeedDto CreateNeedDto
   */
  @Post('need')
  async createNeed(@Body() createNeedDto: CreateNeedDto) {
    return this.palService.create(createNeedDto);
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
  @Get('needs')
  async getNeeds(
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
  @Get('need/:id')
  async getNeed(@Param('id') id: string) {
    return await this.palService.findOneById(id);
  }

  /**
   * 修改搭子需求信息
   * @body 搭子需求信息
   * @returns 修改后的搭子需求信息
   */
  @Patch('need')
  async updateNeed(@Body() need: UpdateNeedDto) {
    const r = await this.palService.update(need);
    if (!r) throw new Error();
    return r;
  }

  /**
   * 删除搭子需求
   * @param id 搭子需求id
   * @returns 删除成功与否
   */

  @Delete('need/:id')
  async deleteNeed(@Param('id') id: string) {
    const r = await this.palService.delete(id);
    return r;
  }
}
