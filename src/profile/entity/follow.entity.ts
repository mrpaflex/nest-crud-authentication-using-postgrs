import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class followEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    followerId: number;

    @Column()
    followingId: number

}