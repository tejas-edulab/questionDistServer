import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
    UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { IRoles } from '../user/user.types';

@Entity()
export default class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    roleId: string;

    @Column({
        type: 'enum',
        enum: IRoles,
        unique: true,
        nullable: false,
    })
    roleName: IRoles;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
