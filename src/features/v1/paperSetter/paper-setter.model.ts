import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class PaperSetter {

    @PrimaryGeneratedColumn()
    id: number

    @Column({

    })
    subjectId: number

    @Column()
    userId: number

    @Column()
    examId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
