
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import {User} from './user.schema'
import {PartialType} from '@nestjs/mapped-types'
export class CreateUserDto extends User{
}
export class FindUserDto extends User{
}

export class UpdateUserDto extends PartialType(User){
  @IsString()
  id:string
}