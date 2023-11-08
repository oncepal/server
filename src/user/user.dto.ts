
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  wxAccount: string;
  @IsNotEmpty()
  @IsString()
  wxName: string;

  @IsString()
  phoneNumber: string

}

export class UpdateUserDto {
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString()
  name: string;
  @IsString()
  wxAccount: string;
  @IsString()
  phoneNumber: string
  @IsNotEmpty({ message: '请输入年龄' })
  @IsNumber()
  age: number;
}