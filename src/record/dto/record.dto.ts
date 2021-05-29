import { IsNumber, IsEmail, IsNotEmpty  } from 'class-validator';

export class RecordDTO {
    // @IsNotEmpty()
    // @IsEmail()
    accreditedUser: string

    @IsNotEmpty()
    @IsEmail()
    userReceived: string

    @IsNotEmpty()
    // @IsNumber()
    amount: number

}