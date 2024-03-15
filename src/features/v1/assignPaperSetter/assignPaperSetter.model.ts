import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class AssignPaperSetter {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    subjectId: number

    @Column({ nullable: true })
    userId: number

    @Column({ nullable: true })
    examId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
