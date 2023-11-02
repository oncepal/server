export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export class UserProfileDto {
    name: string;
    email: string;
}