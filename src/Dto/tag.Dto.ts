import {IsEmail, IsNotEmpty, IsStrongPassword, } from "class-validator";

export class CreateTagDto{

    @IsNotEmpty()
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

}