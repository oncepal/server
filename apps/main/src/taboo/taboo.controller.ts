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
  Logger,
} from '@nestjs/common';
import { TabooService } from './taboo.service';
import { Prisma, Taboo as TabooModel } from '@prisma/client';
import { Response } from 'express';

import { PaginationDto } from '@libs/dtos';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  IntersectionType,
} from '@nestjs/swagger';
import { UpdateTabooDto, CreateTabooDto, TabooDto } from 'prisma/dto';
import { ApiCustomResponse } from '@libs/decorators';

@ApiTags('taboo')
@Controller()
export class TabooController {
  constructor(private readonly tabooService: TabooService) {}
  private readonly logger = new Logger();
  /**
   * 创建违禁词
   * @body taboo 违禁词信息
   * @returns 创建好的违禁词信息
   */
  @Post('taboo')
  @Header('content-type', 'application/json')
  @ApiOperation({ summary: '创建违禁词' })
  @ApiResponse({ status: 200, description: '违禁词创建成功', type: TabooDto })
  @ApiResponse({ status: 400, description: '违禁词信息不完整' })
  async createTaboo(
    @Body() createTabooDto: CreateTabooDto,
    @Res() res: Response,
  ) {
    const existingTaboo = await this.tabooService.findOne({
      name: createTabooDto.name,
    });

    if (!existingTaboo) {
      const newTaboo = await this.tabooService.create(createTabooDto);

      res.status(200).send({
        data: newTaboo,
        code: 200,
        message: '违禁词创建成功',
      });
    } else {
      res.status(200).send({
        data: existingTaboo,
        code: 200,
        message: '违禁词已存在',
      });
    }
  }

  /**
   * 查询匹配条件的违禁词
   * @query querys 查询条件
   * @returns 满足条件的违禁词列表
   */
  @Get('taboos')
  @ApiOperation({ summary: '查询违禁词列表' })
  @ApiCustomResponse(TabooDto, { status: 200, dataType: 'array' })
  async getTaboos(@Query() querys: PaginationDto): Promise<TabooDto[]> {
    const { skip, take } = querys;
    return this.tabooService.findMany({
      skip,
      take,
      // cursor,
      // where,
      // orderBy,
    });
  }

  /**
   * 查询违禁词详情
   * @param id 违禁词id
   * @returns 违禁词详情对象
   */
  @Get('taboo/:id')
  @ApiOperation({ summary: '查询违禁词详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: TabooDto })
  @ApiResponse({ status: 404, description: '违禁词不存在' })
  async getTabooById(@Param('id') id: string): Promise<TabooDto> {
    return await this.tabooService.findOneById(id);
  }

  /**
   * 修改违禁词信息
   * @body 违禁词信息
   * @returns 修改后的违禁词信息
   */
  @Patch('taboo/:id')
  @ApiOperation({ summary: '修改违禁词信息' })
  @ApiResponse({ status: 200, description: '修改成功', type: TabooDto })
  @ApiResponse({ status: 404, description: '违禁词不存在' })
  async updateTaboo(
    @Param('id') tabooId: string,
    @Body() updateTabooDto: UpdateTabooDto,
  ) {
    return await this.tabooService.updateTabooById(tabooId, updateTabooDto);
  }

  /**
   * 删除违禁词
   * @param id 违禁词id
   * @returns 删除成功与否
   */
  @Delete('taboo/:id')
  @ApiOperation({ summary: '删除违禁词' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 404, description: '违禁词不存在' })
  async deleteTabooById(@Param('id') id: string) {
    const r = await this.tabooService.delete({ id });
    return r;
  }

  /**
   * 清空违禁词
   * @returns 删除成功与否
   */
  @Delete('taboos')
  @ApiOperation({ summary: '清空违禁词' })
  @ApiResponse({ status: 200, description: '清空成功' })
  async deleteTaboos() {
    const r = await this.tabooService.deleteAll();
    return r;
  }
}
