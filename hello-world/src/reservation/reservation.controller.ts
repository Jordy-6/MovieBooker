/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, ValidationPipe, Param, UseGuards, Request } from '@nestjs/common';
import { ReservationDto } from './dto/ReservationDto.dto';
import { ReservationService } from './reservation.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('reservation')
export class ReservationController {

    constructor(private reservationService: ReservationService) {}
   
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiNotAcceptableResponse({description: "Reservation impossible or Reservation already booked"})
    @ApiBody({type: ReservationDto})
    @ApiResponse({status: 201, description: 'Reservation created'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @Post()
    create(@Body(new ValidationPipe()) reservationDto: ReservationDto, @Request() req){
        return this.reservationService.createReservation(reservationDto, req.user.userId)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiNotFoundResponse({description: "You don't have any reservations"})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiResponse({
        status: 200, 
        description: 'All user reservations',
        schema: {
            type: 'object',
            properties: {
                reservations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            idUser: { type: 'number' },
                            idMovie: { type: 'number' },
                            reservationStart: { type: 'string', format: 'date-time' },
                            reservationEnd: { type: 'string', format: 'date-time' }
                        }
                    }
                },
                message: { type: 'string', example: 'All user reservations' }
            }
        }
    })
    @Get()
    getAllUserReservations(@Request() req){
        return this.reservationService.getAllUserReservations(req.user.userId)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, description: 'Reservation deleted'})
    @ApiBadRequestResponse({description: 'Reservation ID is required' })
    @ApiNotFoundResponse({description: 'Reservation with ID  not found'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @Delete(':id')
    async deleteReservation(@Param('id') id: number): Promise<any> {
      return this.reservationService.deleteReservation(id);
    }
}
