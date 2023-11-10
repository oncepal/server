
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateUserDto {

  @IsString()
  wxAccount: string;

  @IsString()
  wxName: string;

  @IsString()
  phoneNumber: string

}

export class UpdateUserDto {

  @IsString({ message: '请输入用户名' })
  name: string;
  @IsString()
  wxAccount: string;
  @IsString()
  phoneNumber: string
  
  @IsNumber()
  age: number;
}