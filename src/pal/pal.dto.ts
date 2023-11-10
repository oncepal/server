import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class GetPalListDto {
    @IsNotEmpty()
    wxAccount:string;
    @IsNotEmpty()
    phoneNumber:string
    @IsNotEmpty()
    wxName:string
}
export class CreatePalDto {
    @IsNotEmpty()
    wxAccount:string;
    @IsNotEmpty()
    phoneNumber:string
    @IsNotEmpty()
    wxName:string
}