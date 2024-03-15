import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class AssignSME {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    subjectId: number

    @Column({ nullable: true })
    userId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
