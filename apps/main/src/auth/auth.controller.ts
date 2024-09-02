import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Inject, Query, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto,RefreshDto,RegisterDto } from './dto/auth.dto';

import { Public } from '@libs/decorators';
@Controller('auth')
export class AuthController {

  @Inject()
  private authService: AuthService

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logIn')
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }



  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken:string) {
  
    return this.authService.refresh(refreshToken);
  }


}