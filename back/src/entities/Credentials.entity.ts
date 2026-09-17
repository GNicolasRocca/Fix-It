import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("credentials")
export class Credential{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, length: 50, nullable: false })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @OneToOne(() => User, (user) => user.credentials)
    user: User;     

    @CreateDateColumn()
    createAt?: Date;
    
    @UpdateDateColumn()
    updateAt?: Date;
}