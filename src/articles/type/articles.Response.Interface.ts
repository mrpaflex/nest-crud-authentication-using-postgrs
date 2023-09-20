import { ArticleEntity } from "src/entities/article.entity";

export interface ArticlesResponseInterface{
    articles: ArticleEntity[],
    articleCount: number
}