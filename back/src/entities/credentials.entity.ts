import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity("credentials")
export class Credentials{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", unique: true, length: 50, nullable: false })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @OneToOne(() => Users, (users) => users.credentials)
    user: Users;     

    @CreateDateColumn()
    createAt?: Date;
    
    @UpdateDateColumn()
    updateAt?: Date;
}