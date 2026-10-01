import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Credentials } from "./credentials.entity";
import { Appointments } from "./appointments.entity";

@Entity("users")
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, length: 50, nullable: false })
    email: string;

    @Column({ type: "date", nullable: false })
    birthdate: Date;

    @Column({ type: "integer", unique: true, nullable: false })
    nDni: number;

    @OneToOne(() => Credentials, (credentials) => credentials.user, 
    { nullable: false, cascade: true })
    @JoinColumn()
    credentials: Credentials;

    @OneToMany(() => Appointments, (appointments) => appointments.user)
    appointments: Appointments[];

    @CreateDateColumn()
    createAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;
}