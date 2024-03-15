/* eslint-disable @typescript-eslint/indent */
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export default class College {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    collegeCode: number;
  
    @Column({
      default: 0,
    })
    centerCode: number;
  
    @Column({
      default: '',
    })
    collegeName: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  