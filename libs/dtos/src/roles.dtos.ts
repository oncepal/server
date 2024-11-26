import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateRoleDto {

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
