import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IExamType, IMonthType } from "../../../types/exam.types";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: IExamType,
        nullable: false,
    })
    examType: IExamType;

    @Column({
        nullable: false,
    })
    semesterId: number;
    @Column({
        nullable: false,
    })
    courseId: number;
    @Column({
        nullable: false,
    })
    semesterCode: string;

    @Column({
        nullable: false,
    })
    courseCode: string;

    @Column({
        nullable: false,
    })
    examCode: string;

    @Column({
        type: 'enum',
        enum: IMonthType,
        nullable: false,
    })
    month: IMonthType;

    @Column({
        nullable: false,
    })
    year: number;

    @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
