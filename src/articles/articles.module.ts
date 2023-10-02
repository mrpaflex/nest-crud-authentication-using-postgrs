import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticlesController } from './articles.controller';
import { CreateUserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, CreateUserEntity])],
  controllers: [ArticlesController],
  providers: [ArticlesService],


})
export class ArticlesModule {}
