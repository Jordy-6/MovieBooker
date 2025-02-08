/* eslint-disable prettier/prettier */


import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class ReservationDto {

    @ApiProperty({
        description: 'ID of the user',
        type: Number,
        required: true,
        example: 9
    })
    @IsNumber()
    idUser: number;

    @ApiProperty({
        description: 'ID of the movie',
        type: Number,
        required: true,
        example: 987
    })
    @IsNumber()
    idMovie: number;

    @ApiProperty({
        description: 'Date of the reservation',
        type: Date,
        required: true,
        example: "2025-02-06 22:00:00"
    })
    @IsDateString()
    reservationStart: Date;

}