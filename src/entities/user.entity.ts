import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Hash } from "crypto";
import { Exclude } from "class-transformer";


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
    @Exclude()
    password: string;
    // @BeforeInsert()
    // async hashPassword(){
    //     this.password = await new Hash(this.password, 10);
    // }

}