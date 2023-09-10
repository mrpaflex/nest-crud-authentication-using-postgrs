import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Dto/user.Dto';
import { UserLoginDTO } from 'src/Dto/user.login.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import { ExpressRequest } from './types/expressRequest.interface';

@Controller('user')

//@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userservice: UserService){}

    
    @Post('signup')
    @UsePipes(new ValidationPipe())
   async createusers(@Body() createUserDto: CreateUserDto): Promise<CreateUserEntity>{
        const conUser = await  this.userservice.createAuser(createUserDto);
        return conUser;
       //return await this.userservice.builderUserResponse(conUser)
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async loginuser(@Body() logingDTO: UserLoginDTO){
        const loggedUser = await this.userservice.loginaUser(logingDTO);
       const showloggedInToken =  await this.userservice.builderUserResponse(loggedUser)
      // return loggedUser
       return showloggedInToken;
    }
  
    @Get('current')
    @UsePipes(new ValidationPipe())
    async currentUser(@Req() request: ExpressRequest){
        return await this.userservice.builderUserResponse(request.user)
    }

}
