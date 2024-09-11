import { IsString, IsNumber, IsNotEmpty, Length } from 'class-validator';
export class LogInDto {
    @Length(11,11,{
        message: 'phoneNumber必须是11位！'
    })
    @IsString({
        message: 'phoneNumber必须是字符串！'
    })
    phoneNumber:string
}

export class RegisterDto extends LogInDto{
  
}

export class GetCaptchaDto extends LogInDto{
  
}

export class RefreshDto {

    @IsString({
        message: 'Refresh不能为空！'
    })
    refreshToken:string
}