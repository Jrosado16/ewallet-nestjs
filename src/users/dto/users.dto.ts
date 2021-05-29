import { IsString, IsNumber, IsEmail, IsNotEmpty  } from 'class-validator';

export class UsersDTO {

    @IsString()
    @IsNotEmpty()
    readonly firstName: string

    @IsString()
    @IsNotEmpty()
    readonly lastName: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    readonly balance?: number
}