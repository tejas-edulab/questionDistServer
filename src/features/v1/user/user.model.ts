import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import {IRoles} from './user.types'
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: null
    })
    firstName: string

    @Column({
        default: null
    })
    lastName: string

    @Column({
        default: null
    })
    age: number

    @Column({
        default: null
    })
    userId: string

    @Column({
        default: null
    })
    email: string;

    @Column({
        type: 'enum',
        enum:IRoles,
        nullable:true
    })
    role: IRoles;

    @Column({
        nullable: true
    })
    username: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
