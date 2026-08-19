import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointments.entity";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false}) // buscar nullable
    name: string

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    email: string

    @Column({ type: "date", nullable: false})
    birthdate: Date

    @Column({ type: "integer", nullable: false, unique: true})
    nDni: number

    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credentials: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]

    @CreateDateColumn()
    createAt?: Date

    @CreateDateColumn()
    updateAt?: Date
}