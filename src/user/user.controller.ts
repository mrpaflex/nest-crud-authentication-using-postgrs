import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Put, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Dto/user.Dto';
import { UserLoginDTO } from 'src/Dto/user.login.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import { ExpressRequest } from './types/expressRequest.interface';
import { User } from './customDecorator/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UserUpdateDto } from 'src/Dto/user.Update';

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
  

    //check current user logged in
    @Get('current')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: CreateUserEntity){
        return await this.userservice.builderUserResponse(user)
    }

    //update a user
    @Put('update')
    @UseGuards(AuthGuard)
    async updateuser(@User('id') currentUserId: number, @Body() updateuserDto: UserUpdateDto): Promise<CreateUserEntity>{
        return await this.userservice.updateAuser(currentUserId, updateuserDto)
    }

}
