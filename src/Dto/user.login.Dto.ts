import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDTO{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @IsNotEmpty()
    password: string;
}