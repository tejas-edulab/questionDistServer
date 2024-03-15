import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    centerId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
