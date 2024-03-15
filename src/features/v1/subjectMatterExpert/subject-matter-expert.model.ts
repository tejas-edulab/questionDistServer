import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class SubjectMatterExpert {

    @PrimaryGeneratedColumn()
    id: number

    @Column({

    })
    subjectId: number

    @Column()
    userId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
