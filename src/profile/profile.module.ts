import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from 'src/entities/user.entity';
import { followEntity } from './entity/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreateUserEntity, followEntity])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
