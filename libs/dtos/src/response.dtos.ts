import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  code: number;

  data: T;
  @ApiProperty({
    type: 'string',
  })
  message: string ;
}
