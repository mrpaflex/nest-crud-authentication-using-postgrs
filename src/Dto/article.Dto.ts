import { IsNotEmpty } from "class-validator";

export class ArticleDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    body: string;

    tagList: string[]
}