import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointments.entity";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, length: 50, nullable: false })
    email: string;

    @Column({ type: "date", nullable: false })
    birthdate: Date;

    @Column({ type: "integer", unique: true, nullable: false })
    nDni: number;

    @OneToOne(() => Credential, (credential) => credential.user, 
    { nullable: false, cascade: true })
    @JoinColumn()
    credentials: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @CreateDateColumn()
    createAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;
}