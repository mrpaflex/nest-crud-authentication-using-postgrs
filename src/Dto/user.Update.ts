import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./user.Dto";

export class UserUpdateDto extends PartialType(CreateUserDto){
    // email: string;

    // username: string;

    // bio: string;
    
    // image:string
}

