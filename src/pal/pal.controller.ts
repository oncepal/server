import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { PalService } from './pal.service';

import {FindPalDto,  CreatePalDto,UpdatePalDto } from './pal.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('pal')
export class PalController {
  constructor(private palService: PalService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() pal: CreatePalDto ) {
    return this.palService.create(pal);
  }

  @Get()
  findAll() {
    return this.palService.find();
  }
  
  @Get(':filter')
  find(@Body() filter: FindPalDto) {
    return filter;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePalDto) {
    return this.palService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.palService.delete(id);
  }
}