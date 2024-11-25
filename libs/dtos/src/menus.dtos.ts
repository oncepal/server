import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  id: string;
  
  @IsString()
  name: string;

  @IsString()
  url: string;
  
  @IsOptional()
  @IsString()
  parentId: string;
}
export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  parentId: string;
}
