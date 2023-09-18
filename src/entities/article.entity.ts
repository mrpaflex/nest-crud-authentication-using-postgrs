import {BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CreateUserEntity } from "./user.entity";

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'man like'})
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
    
    @ManyToOne(()=> CreateUserEntity, (user)=> user.articles)
    author: CreateUserEntity;
}