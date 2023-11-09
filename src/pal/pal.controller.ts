import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { PalService } from './pal.service';

import { } from './pal.dto';
@Controller('pal')
export class PalController {
  constructor(private authService: PalService) {}


  

}