import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { StatisticService } from './statistic.service';

import {FindStatisticDto,  } from './statistic.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get()
  findAll() {
    return this.statisticService.find();
  }
  
}