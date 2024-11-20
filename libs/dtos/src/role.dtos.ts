import { IsString, IsOptional, IsNumber } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  name: string;
}

export class UpdateRoleDto {
  @ApiPropertyOptional({ description: '角色名称' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class GetRolesDto {
  @ApiPropertyOptional({ description: '跳过记录数' })
  @IsOptional()
  @IsNumber()
  skip?: number;

  @ApiPropertyOptional({ description: '获取记录数' })
  @IsOptional()
  @IsNumber()
  take?: number;

  @ApiPropertyOptional({ description: '游标' })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ description: '查询条件' })
  @IsOptional()
  where?: any;

  @ApiPropertyOptional({ description: '排序条件' })
  @IsOptional()
  orderBy?: any;
}

