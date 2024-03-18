import 'reflect-metadata';
import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

export type ICredits = 'YES' | 'NO';

@Entity()
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  // Added for HSNC
  @Column({
    nullable: true,
  })
  collegeName: string;

  @Column({
    nullable: true,
  })
  semesterId: number;
  @Column({
    nullable: true,
  })
  courseId: number;
  @Column({
    nullable: true,
  })
  semesterCode: string;

  @Column({
    nullable: true,
  })
  courseCode: string;


  @Column({ nullable: true, unique: true })
  subjectCode: string;

  @Column({ nullable: true })
  oldSubjectCode: string;

  @Column({ nullable: false })
  subjectName: string;

  @Column({ nullable: true })
  subjectType: string;

  @Column({ nullable: false })
  credits: number;

  @Column({ nullable: false, default: 0 })
  externalMax: number;

  @Column({ nullable: false, default: 0 })
  externalMin: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
