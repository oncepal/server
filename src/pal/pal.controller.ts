import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { PalService } from './pal.service';

import { CreatePalDto } from './pal.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('pal')
export class PalController {
  constructor(private palService: PalService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() pal: CreatePalDto ) {
    return this.palService.create(pal);
  }
  

}