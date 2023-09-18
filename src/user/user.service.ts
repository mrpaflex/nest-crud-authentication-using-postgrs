import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Dto/user.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import {sign} from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { encodedPassword } from 'util/bcrypt';
import { UserLoginDTO } from 'src/Dto/user.login.Dto';
import * as bcrypt from 'bcrypt'
import { JWT_SECRET } from './jwtSecret/userjwt';
import { UserUpdateDto } from 'src/Dto/user.Update';

@Injectable()
export class UserService {
   constructor(@InjectRepository(CreateUserEntity) private readonly userserviRepo: Repository<CreateUserEntity>){}

   async createAuser(createUserDto: CreateUserDto): Promise<CreateUserEntity>{

      const checkEmail = await this.userserviRepo.findOneBy({email: createUserDto.email});
      const checkUsername = await this.userserviRepo.findOneBy({username: createUserDto.username});

      if (checkEmail || checkUsername) {
         throw new HttpException('user with same credential already exit', HttpStatus.UNPROCESSABLE_ENTITY)
      }else{
      
         const newuser =  await this.userserviRepo.create(createUserDto);
         delete newuser.password
         return await this.userserviRepo.save(newuser)
      }

   }

   //user login
   async loginaUser(userloginDto: UserLoginDTO): Promise<CreateUserEntity>{
      const finduser = await this.userserviRepo.findOneBy({email: userloginDto.email});
      if (!finduser) {
         throw new HttpException(`user doesn't exit`, HttpStatus.UNPROCESSABLE_ENTITY)
      }else{
         const iSPasswordCorred = await bcrypt.compare(userloginDto.password, finduser.password)

         if (!iSPasswordCorred) {
            throw new HttpException(`password does'nt matche`, HttpStatus.UNPROCESSABLE_ENTITY)
         }else{
            delete finduser.password;
            return finduser
         }
      }
   }

   //find a user by id
   async findoneuser(id: number): Promise<CreateUserEntity>{
      return await this.userserviRepo.findOne({where: {id: id}})
   }

   //update user
   async updateAuser(id: number, updateuserDto: UserUpdateDto): Promise<CreateUserEntity>{
      const checkuser = await this.userserviRepo.findOneBy({id})
      if(!checkuser){
         throw new HttpException(`user does'nt exit `, HttpStatus.NOT_FOUND)
      }
     const updatedUser =  Object.assign(checkuser, updateuserDto);
     delete updatedUser.password;
     return await this.userserviRepo.save(updatedUser)
   }
   generateJwt(user: CreateUserEntity) {
      return sign({
         id: user.id,
         username: user.username,
         email: user.email
      }, JWT_SECRET,)//you can write the secret in another folder and call it here any how you like it
   }
   //this is function to create users response
   builderUserResponse(user: CreateUserEntity){//reference to your learning book if you want to add specify interface ud_V generating jwt
         return {
            user: {
               ...user, ///....if //you want other users info to show along side with the generated token on this
               token: this.generateJwt(user)
            }
         }
   }

 
}
