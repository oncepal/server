
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString()
  name: string;
  @IsString()
  vx: string;
  @IsString()
  phoneNumber: string
  @IsNotEmpty({ message: '请输入年龄' })
  @IsNumber()
  age: number;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString()
  name: string;
  @IsString()
  vx: string;
  @IsString()
  phoneNumber: string
  @IsNotEmpty({ message: '请输入年龄' })
  @IsNumber()
  age: number;
}