import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/IAppointment";
import { Users } from "./users.entity";

@Entity("appointments")
export class Appointments{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "date", nullable: false })
    date: string;

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string;

    @ManyToOne(() => Users, (users) => users.appointments, { nullable: false })
    @JoinColumn()
    user: Users;
    
    @Column({ type: "enum", nullable: false, enum: Status, default: Status.active })
    status: Status;

    @CreateDateColumn()
    createAt?: Date

    @UpdateDateColumn()
    updateAt?: Date
}