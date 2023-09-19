import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ArticleDTO } from 'src/Dto/article.Dto';
import { ArticleEntity } from 'src/entities/article.entity';
import { CreateUserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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

}
