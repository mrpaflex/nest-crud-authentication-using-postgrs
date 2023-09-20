import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto{
 
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
 
    //@IsNotEmpty()
    password: string;
}