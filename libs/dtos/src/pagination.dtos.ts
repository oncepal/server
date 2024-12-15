import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: 'integer',
    required:false
  })
  @IsOptional()
  @IsInt()
  skip: number = 0;
  @ApiProperty({
    type: 'integer',
    required:false
  })
  @IsOptional()
  @IsInt()
  take: number = 99999;
}
