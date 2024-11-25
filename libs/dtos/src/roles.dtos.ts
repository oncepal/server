import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { RolePermission, UserRoleRelation } from '@prisma/client';

export class CreateRoleDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
