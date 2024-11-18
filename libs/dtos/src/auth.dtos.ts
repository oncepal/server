import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}

export class LogOutDto {
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}

export class RegisterDto {
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}

export class GetCaptchaDto {
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}

export class RefreshDto {
  @ApiProperty({ description: '刷新 token' })
  refreshToken: string;
}
