import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { OmitType, PartialType, IntersectionType } from '@nestjs/mapped-types'
export class CreateUserDto {
    @IsString()
    avatar: string
    @IsString()
    name: string;
    @IsNumber()
    age: number;
    @IsString()
    phoneNumber: string
    @IsNumber()
    weight: number;
    @IsNumber()
    height: number;
    @IsString()
    birthday: string;
    @IsNumber()
    sex: number;
    @IsBoolean()
    isFrozen:boolean
    @IsString()
    introduction: string;
}

export class UpdateUserDto extends CreateUserDto{
    @IsNotEmpty()
    @IsString()
    id:string
   
}


