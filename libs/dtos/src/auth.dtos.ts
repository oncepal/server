import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'prisma/dto';
export class LogInDto {
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}
export class AuthInfoDto{
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;
  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;
  @ApiProperty({
    type: ()=>UserDto,
  })
  userInfo: UserDto;
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
