import { Body, Controller, Get, Param, Post, UseGuards, Delete, Put, Query } from '@nestjs/common';
import { ArticleDTO } from 'src/Dto/article.Dto';
import { CreateUserEntity } from 'src/entities/user.entity';
import { User } from 'src/user/customDecorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticleResponseInterface } from './type/article.interface';
import { ArticleUpdateDTO } from 'src/Dto/article.Update.Dto';
import { ArticlesResponseInterface } from './type/articles.Response.Interface';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService){}

    @Get()
    async findall(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseInterface>{
        return await this.articlesService.findall(currentUserId, query)
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createArticle(@User() currentUser: CreateUserEntity, @Body() articledto: ArticleDTO): Promise<ArticleEntity> {
        return   await this.articlesService.createAnArticle(currentUser, articledto)
       // return await this.articlesService.buildArticle(article)//this is not neccessary
    }

    @Get('find/:slug')
    async getAnArticle(@Param('slug') slug: string): Promise<ArticleEntity>{
        const article = await this.articlesService.findBySlug(slug)//note findBySlug a function in service
        return article;
    }

    @Delete('delete/:slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string){
        return await this.articlesService.deleteAnArticle(currentUserId, slug)
    }

    @Put('update/:slug')
    @UseGuards(AuthGuard)
    async updateArticle(@User('id') currentUserId: number, @Param('slug') slug: string, @Body() articleupdateDTo: ArticleUpdateDTO): Promise<ArticleEntity>{
        return await this.articlesService.updateAnArticle(currentUserId, slug, articleupdateDTo)
    }



}
