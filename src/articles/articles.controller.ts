import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleDTO } from 'src/Dto/article.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import { User } from 'src/user/customDecorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from 'src/entities/article.entity';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService){}
    @Post('create')
    @UseGuards(AuthGuard)
 
    async createArticle(@User() currentUser: CreateUserEntity, @Body() articledto: ArticleDTO): Promise<ArticleEntity> {
        return await this.articlesService.createAnArticle(currentUser, articledto)
    }

}
