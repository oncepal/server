import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { User } from './user.schema'
import { OmitType,PartialType, IntersectionType } from '@nestjs/mapped-types'
import { IdDto } from 'src/common/dto/common.dto';
export class UserWithoutWeChatInfo extends OmitType(PartialType(User),['wechatInfo'])
{}

export class UpdateUserDto extends
UserWithoutWeChatInfo {
}
export class CreateUserDto extends UserWithoutWeChatInfo {
}
export class FindUserDto extends UserWithoutWeChatInfo {
}

