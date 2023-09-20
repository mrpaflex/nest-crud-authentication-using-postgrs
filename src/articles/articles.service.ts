import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ArticleDTO } from 'src/Dto/article.Dto';
import { ArticleEntity } from 'src/entities/article.entity';
import { CreateUserEntity } from 'src/entities/user.entity';
import { DeleteResult, QueryBuilder, Repository, getRepository } from 'typeorm';
import { ArticleResponseInterface } from './type/article.interface';
import { ArticleUpdateDTO } from 'src/Dto/article.Update.Dto';
import { ArticlesResponseInterface } from './type/articles.Response.Interface';

// let randomString = (Math.random()*Math.pow(3, 2) | 0).toString(12);
// console.log(randomString)

@Injectable()
export class ArticlesService {
constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>){}
async createAnArticle(currentUser: CreateUserEntity, articledto: ArticleDTO): Promise<ArticleEntity>{
const article = await new ArticleEntity()
const assignArticle = Object.assign(article, articledto)

if (!assignArticle.tagList) {
    assignArticle.tagList = [];
    
}

assignArticle.author = currentUser;

return await this.articleRepository.save(assignArticle)

}

async findall(currentUserId: number, query: any): Promise<ArticlesResponseInterface>{

    const queryBuilder = getRepository(ArticleEntity).createQueryBuilder('articles').leftJoinAndSelect('articles.author', 'author');
    const articles = await queryBuilder.getMany();
    const articleCount = await queryBuilder.getCount()
}

async findBySlug(slug: string){

    const article = await this.articleRepository.findOneBy({slug})
    if(!article){
        throw new HttpException('such article do not exit', HttpStatus.NOT_FOUND)
    }
    return article
    
}

async updateAnArticle(currentUserId: number, slug: string, articleupdateDTo: ArticleUpdateDTO): Promise<ArticleEntity>{
    const article = await this.findBySlug(slug)
    if (article.author.id !== currentUserId) {
        throw new HttpException('you are not the author of this article', HttpStatus.FORBIDDEN)
    }
    const updateArticle = Object.assign(article, articleupdateDTo)
    return await this.articleRepository.save(updateArticle)

}

async deleteAnArticle(currentUserId: number, slug: string): Promise<DeleteResult>{
    const checkArticle = await this.findBySlug(slug);
    if(!checkArticle){
        throw new HttpException('article not found', HttpStatus.NOT_FOUND)
    }
    if (checkArticle.author.id !== currentUserId) {
        throw new HttpException('you are not the auth of this article', HttpStatus.FORBIDDEN)
    }

    return await this.articleRepository.delete({slug})

}

// async buildArticle(article: ArticleEntity): Promise<ArticleResponseInterface>{
//     return{article}
// }

}
