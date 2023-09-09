import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Dto/user.Dto';

@Controller('api')
@UsePipes(ValidationPipe)
//@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userservice: UserService){}

    @Post('user')
   async createusers(@Body() createUserDto: CreateUserDto){
        const conUser = await  this.userservice.createAuser(createUserDto);

        return await this.userservice.builderUserResponse(conUser)
    }

  

}
