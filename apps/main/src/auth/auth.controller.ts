import {
  Body,
  Request,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Inject,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthInfoDto,
  GetCaptchaDto,
  LogInDto,
  LogOutDto,
  RefreshDto,
  RegisterDto,
} from '@libs/dtos';
import { ApiCustomResponse, Public } from '@libs/decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: '用户登出' })
  @ApiResponse({ status: 200, description: '登出成功' })
  logout(@Body() logOutDto: LogOutDto) {
    return this.authService.logOut(logOutDto.phoneNumber);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: LogInDto })
  login(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto.phoneNumber);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('loginWithRegister')
  @ApiOperation({ summary: '用户登录并注册' })
  @ApiCustomResponse(AuthInfoDto, { status: 200, dataType: 'object' })
  logInWithRegister(@Body() logInDto: LogInDto) {
    return this.authService.logInWithRegister(logInDto.phoneNumber);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 200, description: '注册成功', type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.phoneNumber);
  }

  @HttpCode(HttpStatus.OK)
  @Post('captcha')
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({
    status: 200,
    description: '验证码获取成功',
    type: GetCaptchaDto,
  })
  captcha(@Body() getCaptchaDto: GetCaptchaDto) {
    return this.authService.register(getCaptchaDto.phoneNumber);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @ApiOperation({ summary: '刷新 token' })
  @ApiResponse({ status: 200, description: 'token 刷新成功', type: RefreshDto })
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
