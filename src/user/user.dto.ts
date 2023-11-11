
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { User } from './user.schema'
import { PartialType, IntersectionType } from '@nestjs/mapped-types'
import { IdDto } from 'src/common/dto/common.dto';

export class UpdateUserDto extends
  IntersectionType(PartialType(User), IdDto) {
}
export class CreateUserDto extends PartialType(User) {
}
export class FindUserDto extends CreateUserDto {
}

