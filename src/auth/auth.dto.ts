import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class SignInDto {
    @IsString()
    wxAccount:string;
    @IsString()
    phoneNumber:string
    @IsString()
    wxName:string
}
export class RegisterDto {
    @IsString()
    wxAccount:string;
    @IsString()
    phoneNumber:string
    @IsString()
    wxName:string
}