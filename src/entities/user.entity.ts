import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from "./article.entity";


@Entity()
export class CreateUserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({default: 'lover of girls'})
    bio: string;

    @Column({default: ''})
    image: string

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }

    //relationship
    @OneToMany(()=> ArticleEntity, (article)=> article.author)
    articles: ArticleEntity[]
}