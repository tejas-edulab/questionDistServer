import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ExamSubject {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    subjectCode: string;

    @Column({
        nullable: true,
    })
    subjectId: number;

    @Column({
        nullable: false,
    })
    examCode: string;

    @Column({
        nullable: true,
    })
    examId: number;

    @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
