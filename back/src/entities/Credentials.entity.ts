import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("credentials")
export class Credential{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false})
    username: string

    @Column({ type: "varchar", length: 100, nullable: false})
    password: string

    @OneToOne(() => User)
    user: User     

    @CreateDateColumn()
    createAt?: Date
    
    @CreateDateColumn()
    updateAt?: Date
}