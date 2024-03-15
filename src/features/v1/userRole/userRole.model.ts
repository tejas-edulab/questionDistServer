import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        nullable: false
    })
    userId: number
    @Column({
        nullable: false
    })
    roleId: number
    @Column({
        nullable: false
    })
    role: string
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}