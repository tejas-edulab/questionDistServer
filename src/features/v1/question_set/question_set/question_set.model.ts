import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class QuestionSet {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    setName: string

    @Column()
    subjectId: number

    @Column()
    examId: number

    @Column({ type: 'json', nullable: true })
    questions: object[]

    @Column()
    userId: number

    @Column({ nullable: true })
    uploadPdf: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
