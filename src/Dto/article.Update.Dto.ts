import { PartialType } from "@nestjs/mapped-types";
import { ArticleEntity } from "src/entities/article.entity";

export class ArticleUpdateDTO extends PartialType(ArticleEntity){

}