import { Body, Request,Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Inject, Query, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCaptchaDto, LogInDto,RefreshDto,RegisterDto } from '@libs/dtos';

import { Public } from '@libs/decorators';
import { Prisma } from '@prisma/client';
@Controller('auth')
export class AuthController {

  @Inject()
  private authService: AuthService

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto.phoneNumber);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('loginWithRegister')
  logInWithRegister(@Body() logInDto: LogInDto) {
    return this.authService.logInWithRegister(logInDto.phoneNumber);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.phoneNumber);
  }


  @HttpCode(HttpStatus.OK)
  @Post('captcha')
  captcha(@Body() getCaptchaDto: GetCaptchaDto) {
    return this.authService.register(getCaptchaDto.phoneNumber);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken:string) {
  
    return this.authService.refresh(refreshToken);
  }
}