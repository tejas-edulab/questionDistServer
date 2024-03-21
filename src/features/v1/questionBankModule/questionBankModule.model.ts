import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class QuestionBankModule {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true,
        default: null
    })
    name: string

    @Column({
        nullable: true,
        default: null
    })
    totalQuestions: number

    @Column({
        nullable: true,
        default: null
    })
    minMarks: number

    @Column({
        nullable: true,
        default: null
    })
    maxMarks: number

    @Column({
        nullable: true,
        default: null
    })
    userId: number

    @Column({
        nullable: true,
        default: null
    })
    subjectId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
