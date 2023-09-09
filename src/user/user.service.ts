import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Dto/user.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import {sign} from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
   constructor(@InjectRepository(CreateUserEntity) private readonly userserviRepo: Repository<CreateUserEntity>){}

   async createAuser(createUserDto: CreateUserDto): Promise<any>{//note the any supppose takes in CreateUserEntity
      

      const checkEmail = await this.userserviRepo.findOneBy({email: createUserDto.email});
      const checkUsername = await this.userserviRepo.findOneBy({username: createUserDto.username});

      if (checkEmail || checkUsername) {
         throw new HttpException('user with same credential already exit', HttpStatus.UNPROCESSABLE_ENTITY)
      }else{
         const newuser =  await this.userserviRepo.save(createUserDto)
 
         return newuser;
      }

   }

   generateJwt(user: CreateUserEntity) {
      return sign({
         id: user.id,
         username: user.username,
         email: user.email
      }, 'jwtsecreetisaftermylife')//you can write the secret in another folder and call it here any how you like it
   }
   //this is function to create users response
   builderUserResponse(user: CreateUserEntity){//reference to your learning book if you want to add specify interface ud_V generating jwt
         return {
            user: {
               ...user,
               token: this.generateJwt(user)
            }
         }
   }

 
}
