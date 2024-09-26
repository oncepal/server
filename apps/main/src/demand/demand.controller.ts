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
import { CreateDemandDto, GetDemandsDto, UpdateDemandDto } from '@libs/dtos';
import { Public } from '@libs/decorators';
import { Demand as DemandModel } from '@prisma/client';

@Controller()
export class DemandController {
  @Inject()
  private readonly demandService: DemandService;

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
    return this.demandService.create(createDemandDto);
  }

  /**
   * @name 查询匹配条件的搭子需求
   * 查询匹配条件的搭子需求
   * @query querys 查询条件
   * @returns 满足条件的搭子需求列表
   */
  @Public()
  @Get('demands')
  async demands(@Query() querys: GetDemandsDto): Promise<DemandModel[]> {
    const { skip, take, cursor, where, orderBy } = querys;

    return this.demandService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 获取搭子需求详情
   * @param id 搭子需求id
   * @returns 用户详情对象
   */
  @Get('demand/:id')
  async getDemand(@Param('id') id: string) {
    return await this.demandService.findOneById(id);
  }

  /**
   * 修改搭子需求信息
   * @body 搭子需求信息
   * @returns 修改后的搭子需求信息
   */
  @Patch('demand')
  async updateDemand(@Body() updateDemandDto: UpdateDemandDto) {
    const { id, ...data } = updateDemandDto;
    const r = await this.demandService.updateDemandById(id, data);
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
    const r = await this.demandService.delete({ id });
    return r;
  }
}
