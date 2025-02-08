/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idUser: number;

    @Column()
    idMovie: number;

    @Column()
    reservationStart: Date

    @Column({nullable: true})
    reservationEnd: Date

}

export default Reservation