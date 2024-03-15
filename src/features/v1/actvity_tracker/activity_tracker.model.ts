import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ActivityTracker {

   @PrimaryGeneratedColumn()
   id: number

   @Column({
      nullable: false
   })
   activity: string;

   @Column({
    nullable:false
   })
   description:string;

   @Column({
    nullable:false
   })
   ipAddress:string

   @Column({
    nullable:false
   })
   userId:string

   @Column({
    nullable:false
   })
   url:string

   @Column({
    nullable:false
   })
   status:number

   @Column({
    nullable:false
   })
   method:string

   @Column({
    nullable:false
   })
   requestBody:string

   @Column({
    nullable:false
   })
   macAddress:string

   @Column({
    nullable:false
   })
   userEmail:string

   @Column({
    nullable:true
   })
   firstName:string

   @Column({
    nullable:true
   })
   lastName:string

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
