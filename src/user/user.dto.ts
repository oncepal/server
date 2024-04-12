import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { User } from './user.schema'
import { OmitType, PartialType, IntersectionType } from '@nestjs/mapped-types'
import { IdDto } from 'src/common/dto/common.dto';

export class UpdateUserDto extends
    OmitType(PartialType(User), ['wechatInfo']) {
}
export class CreateUserDto extends OmitType(PartialType(User), ['wechatInfo', 'id']) {
}

