import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/IAppointment";
import { User } from "./User.entity";

@Entity("appointments")
export class Appointment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string;

    @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
    @JoinColumn()
    user: User;
    
    @Column({ type: "enum", nullable: false, enum: Status, default: Status.active })
    status: Status;

    @CreateDateColumn()
    createAt?: Date

    @UpdateDateColumn()
    updateAt?: Date
}