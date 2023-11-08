import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class SignInDto {
    @IsNotEmpty()
    wxAccount:string;
    @IsNotEmpty()
    phoneNumber:string
    @IsNotEmpty()
    wxName:string
}
export class RegisterDto {
    @IsNotEmpty()
    wxAccount:string;
    @IsNotEmpty()
    phoneNumber:string
    @IsNotEmpty()
    wxName:string
}