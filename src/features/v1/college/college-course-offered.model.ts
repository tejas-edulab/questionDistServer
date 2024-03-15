/* eslint-disable @typescript-eslint/indent */
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class CollegeCourseOffered {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    collegeCode: number;

    @Column({
        nullable: false,
    })
    collegeId: number;

    @Column({
        nullable: false,
    })
    courseId: number;

    @Column({
        nullable: false,
    })
    courseCode: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
