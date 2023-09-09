import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import confiDb from './config/confidb';

@Module({
  imports: [TypeOrmModule.forRoot(confiDb), TagModule, UserModule]
})
export class AppModule {}
