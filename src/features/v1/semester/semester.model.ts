import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
  } from 'typeorm';
import { ISemName } from '../../../types/semester.types';
  
  @Entity()
  export default class Semester {
    @PrimaryGeneratedColumn()
      id: number;
  
    @Column({
      type: 'enum',
      enum: ISemName,
      nullable: false,
    })
      semName: ISemName;
  
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
      courseId: string;

  
    @CreateDateColumn()
      createdAt: Date;
  
    @UpdateDateColumn()
      updatedAt: Date;
  }
  