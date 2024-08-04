import { IsString, IsNumber, IsNotEmpty, Length } from 'class-validator';
export class LogInDto {
    @IsNotEmpty({
        message: '手机号不能为空！'
    })
    @Length(11,11,{message:'请输入11位手机号码'})
    @IsString()
    phoneNumber:string
}

export class RegisterDto extends LogInDto{
  
}

export class RefreshDto {
    @IsNotEmpty({
        message: 'Refresh不能为空！'
    })
    @IsString()
    refreshToken:string
}