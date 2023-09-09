import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tagEntity } from 'src/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tagEntity])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
