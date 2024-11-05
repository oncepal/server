import { $Enums,Like, Prisma,Post, Achievement, Demand } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  Length,
  IsNumberString,
} from 'class-validator';
export class GetDemandsDto {

  skip: number = 0;
  @IsInt({ message: 'take必须是一个数字！' })
  @Type(() => Number)
  take: number = 99999;
  cursor?: Prisma.DemandWhereUniqueInput;
  where?: Prisma.DemandWhereInput;
  orderBy?: Prisma.DemandOrderByWithRelationInput;

}
export class CreateDemandDto {
    demanderId: string;
    description: string | null;
    images?: string[];
    keywords?: string;
    location?: string;
    time: string;
    limits: {
        minAge?: number;
        number?: number;
        sex?: number ;
    };
    payment: {
        
    };
}

export class UpdateDemandDto extends CreateDemandDto{
  @IsString({message:''})
  id: string
}