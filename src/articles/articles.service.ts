import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ArticleDTO } from 'src/Dto/article.Dto';
import { ArticleEntity } from 'src/entities/article.entity';
import { CreateUserEntity } from 'src/entities/user.entity';
import { DataSource, DeleteResult, QueryBuilder, Repository, getRepository } from 'typeorm';
import { ArticleResponseInterfaceSingle } from './type/article.interface';
import { ArticleUpdateDTO } from 'src/Dto/article.Update.Dto';
import { ArticlesResponseInterface } from './type/articles.Response.Interface';



@Injectable()
export class ArticlesService {
constructor(@InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(CreateUserEntity)
    private readonly userRepos: Repository<CreateUserEntity>,
    private readonly dataSource: DataSource,
    
 ){}


async createAnArticle(currentUser: CreateUserEntity, articledto: ArticleDTO): Promise<ArticleEntity>{
const article = await new ArticleEntity()
const assignArticle = Object.assign(article, articledto)

if (!assignArticle.tagList) {
    assignArticle.tagList = [];
    
}

assignArticle.author = currentUser;

return await this.articleRepository.save(assignArticle)

}

async likearticle(userId: number, slug: string): Promise<ArticleEntity>{
    const article = await this.findBySlug(slug)
    const user = await this.userRepos.findOne({where: {id: userId}, relations: ['likes']})

   const isNotLiked = user.likes.findIndex((articleInLike) => articleInLike.id === article.id) === -1;

    if(isNotLiked){
        user.likes.push(article);
        article.likeCount++
        await this.userRepos.save(user);
        await this.articleRepository.save(article)

    }
    return article

}

async dislikearticle(userId: number, slug: string): Promise<ArticleEntity>{
    const article = await this.findBySlug(slug)
    const user = await this.userRepos.findOne({where: {id: userId}, relations: ['likes']})

   const articleIndex = user.likes.findIndex((articleInLike) => articleInLike.id === article.id);

   if (articleIndex >=0) {
    user.likes.splice(articleIndex, 1);
    article.likeCount--;

    await this.userRepos.save(user);
    await this.articleRepository.save(article)
   }
   return article
    
}

async findall(currentUserId: number, query: any): Promise<ArticlesResponseInterface>{
    const queryBuilder = this.dataSource.getRepository(ArticleEntity)
    .createQueryBuilder('articles').leftJoinAndSelect('articles.author', 'author');
    
    if (query.tag) {
        queryBuilder.andWhere('articles.tagList LIKE :tag', {
            tag: `%${query.tag}%`,
        });
        
    }


    //look at this code again in the future........................
    if (query.author) {
        const author = await this.userRepos.findOne({
            where: {username: query.author}
        });
            if(author){
                queryBuilder.andWhere('articles.author.Id = :id', {
                    id: author.id
                });
            }
    }

    if(query.liked){
        const author = await this.userRepos.findOne({
            where: {username: query.liked},
            relations: ['likes']
        })

        const ids = author.likes.map((el)=> el.id)
        if(ids.length > 0){
            
            queryBuilder.andWhere('articles.id IN(:...ids)', {ids})

        
        }else{
            queryBuilder.andWhere('1=0');
        }

    }

    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const articleCount = await queryBuilder.getCount();

    if(query.limit){
        queryBuilder.limit(query.limit);
    }
    if (query.offset) {
        queryBuilder.offset(query.offset);
    }

    //lll
    let likedIds: number[]  = []
if (currentUserId) {
    const currentUser = await this.userRepos.findOne({
        where: {id: currentUserId},
        relations: ['likes']
    });

    likedIds = currentUser.likes.map((like)=>like.id);
    
}

    const articles = await queryBuilder.getMany();

    const articleWithFavourited = articles.map(article=>{
        const liked = likedIds.includes(article.id);

        return { ...article, liked};
    })
    
    return {articles: articleWithFavourited, articleCount};
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

async buildArticlesResponse(article: ArticleEntity): Promise<ArticleResponseInterfaceSingle>{
    return{article}
}

}
