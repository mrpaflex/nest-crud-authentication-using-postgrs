import { ArticleEntity } from "src/entities/article.entity";

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp' | 'generateSlug' >;

