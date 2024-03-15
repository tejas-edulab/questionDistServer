import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Uploads {
    @PrimaryGeneratedColumn()
      id: number;
  
    @Column({
      nullable: false,
    })
      originalname: string;
  
    @Column({
      nullable: false,
    })
      filename: string;
  
    @Column({
      nullable: false,
    })
      mimetype: string;
  
    @Column({
      nullable: false,
    })
      destination: string;
  
    @Column({
      nullable: false,
    })
      encoding: string;
  
    @Column({
      nullable: false,
    })
      extension: string;
  
    @Column({
      nullable: false,
    })
      size: number;
  
    @Column({
      nullable: false,
    })
      helperName: string;
  
    @Column({
      nullable: false,
    })
      uploadedFor: string;
  
    @CreateDateColumn()
      createdAt: Date;
  
    @UpdateDateColumn()
      updatedAt: Date;
  }
  