import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CreateUserEntity } from "./user.entity";
import slugify from "slugify";

let random = (Math.random()*Math.pow(3, 2) | 0).toString(12)

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: ()=> 'current_timestamp'})
    createdAt: Date;

    @Column({type: 'timestamp', default: ()=> 'current_timestamp'})
    updatedAt: Date;

    @Column('simple-array')
    tagList: string[];

    @Column({default: 0})
    likeCount: number

    @BeforeUpdate()
    async updateTimestamp(){
        if (this.updatedAt) {
            this.updatedAt = await new Date();
        }
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true }) +'_'+ random;
    }

    @ManyToOne(()=> CreateUserEntity, (user)=> user.articles, {eager: true})
    author: CreateUserEntity;
}