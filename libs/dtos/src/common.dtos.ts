import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsNumber,IsInt, IsNotEmpty, Length,IsNumberString } from 'class-validator';
export class PaginationDto {
    
    skip?:number  

    @IsInt({message:'take必须是一个数字！'})
    @Type(() => Number)
    take?:number 
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
}