/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Reservation from './reservation.entity';
import { Repository } from 'typeorm';
import { ReservationDto } from './dto/ReservationDto.dto';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ){}
    
    async createReservation(reservationDto: ReservationDto, userId): Promise<any> {

        const { idMovie, reservationStart } = reservationDto;

        const allReservations = await this.reservationRepository.findBy({ idUser: userId });
        
        const date = new Date(reservationStart);

        const reservationEnd = new Date(date.getTime() + 2 * 60 * 60 * 1000);

        if( allReservations.length !== 0){
            for (let i = 0; i < allReservations.length; i++) {

                if(reservationStart >= allReservations[i].reservationStart && reservationStart <= allReservations[i].reservationEnd 
                    || reservationEnd >= allReservations[i].reservationStart && reservationEnd <= allReservations[i].reservationEnd
                    || reservationStart <= allReservations[i].reservationStart && reservationEnd >= allReservations[i].reservationEnd
                ){
                    throw new NotAcceptableException("Reservation impossible or Reservation already booked")
                }
            }
        }


        const res = this.reservationRepository.create({
            idUser: userId,
            idMovie,
            reservationStart,
            reservationEnd: reservationEnd
        });

        await this.reservationRepository.save(res)

        return { message: "Reservation created" }
    }

    async getAllUserReservations(idUser: number): Promise<any> {

        const reservations = await this.reservationRepository.findBy({idUser});
        
        if (reservations.length === 0){
            throw new NotFoundException("You don't have any reservations")
        }
        return {reservations, message: "All user reservations"};
    }

    async deleteReservation(id: number): Promise<any> {
        if (!id) {
            throw new BadRequestException('Reservation ID is required');
        }
        const reservation  = await this.reservationRepository.findBy({id})
        
        if(reservation.length === 0) {
            throw new NotFoundException(`Reservation with ID ${id} not found`)
        }

        await this.reservationRepository.delete(id);
        return { message: "Reservation deleted" }
    }
}
