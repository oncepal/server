import { IsString, IsNumber } from 'class-validator';
export class UpdatePalDto {
    @IsString()
    id: string
    type: string;
    time: string;
    location: string;
    img: Array<string>;
    description: string;
    promoterId: string;
    participantIds: Array<string>;
    paymentMethod: number
    participantLimit: number

}

export class CreatePalDto {
    @IsString()
    type: string;

    @IsString()
    time: string;

    @IsString()
    location: string;

    img: Array<string>;

    @IsString()
    description: string;

    @IsString()
    promoterId: string;

    participantIds: Array<string>;

    @IsNumber()
    paymentMethod: number

    @IsNumber()
    participantLimit: number
}

export class FindPalDto {
    id: string
    type: string;
    time: string;
    location: string;
    promoterId: string;
    paymentMethod: number
}