import { IsString, IsNumber } from 'class-validator';
import { OmitType, PartialType, IntersectionType } from '@nestjs/mapped-types'
import { Need } from '../schemas/need.schema';


export class UpdateNeedDto extends
    PartialType(Need){
}
export class CreateNeedDto extends OmitType(PartialType(Need), ['id']) {
}

