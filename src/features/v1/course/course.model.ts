import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { IDegreeType } from '../../../types/course.types';
import { ISemester } from '../../../types/semester.types';

@Entity()
export default class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    courseName: string;

    @Column({ nullable: false, unique: true })
    courseCode: string;

    @Column({
        type: 'enum',
        enum: IDegreeType,
        default: IDegreeType.UG,
    })
    degreeType: IDegreeType;


    @Column({ nullable: true })
    abbreviation: string;

    @Column({
        type: 'enum',
        enum: ISemester,
        default: ISemester.ONE,
    })
    numberOfSemester: ISemester;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
