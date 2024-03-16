import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class QuestionBank {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @Column()
    marks: number

    @Column()
    questionContent:string

    @Column()
    questionIndex:string

    @Column()
    subject:number

    @Column()
    topic:string

    @Column()
    type:string

    @Column()
    userId:number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
