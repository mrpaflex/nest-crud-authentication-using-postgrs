import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreateUserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
