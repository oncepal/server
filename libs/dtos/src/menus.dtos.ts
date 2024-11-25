import { IsString, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
  
  @IsOptional()
  @IsString()
  parentId: string;
}

export class UpdateMenuDto {
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
