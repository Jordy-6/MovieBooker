import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { NotFoundException, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

// Mock du service
const mockReservationService = {
  createReservation: jest.fn(),
  getAllUserReservations: jest.fn(),
  deleteReservation: jest.fn()
};

describe('ReservationController - Unit Tests', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [{ provide: ReservationService, useValue: mockReservationService }]
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      mockReservationService.createReservation.mockResolvedValue({ message: 'Reservation created' });
      const result = await controller.create({ idMovie: 1, reservationStart: new Date() }, { user: { userId: 1 } });
      expect(result).toEqual({ message: 'Reservation created' });
    });

    it('should throw NotAcceptableException if reservation already exists', async () => {
      mockReservationService.createReservation.mockRejectedValue(new NotAcceptableException('Reservation already booked'));
      await expect(controller.create({ idMovie: 1, reservationStart: new Date() }, { user: { userId: 1 } })).rejects.toThrow(NotAcceptableException);
    });
  });

  describe('getAllUserReservations', () => {
    it('should return all user reservations', async () => {
      mockReservationService.getAllUserReservations.mockResolvedValue({ reservations: [], message: 'All user reservations' });
      const result = await controller.getAllUserReservations({ user: { userId: 1 } });
      expect(result).toEqual({ reservations: [], message: 'All user reservations' });
    });

    it('should throw NotFoundException if no reservations exist', async () => {
      mockReservationService.getAllUserReservations.mockRejectedValue(new NotFoundException("You don't have any reservations"));
      await expect(controller.getAllUserReservations({ user: { userId: 1 } })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation', async () => {
      mockReservationService.deleteReservation.mockResolvedValue({ message: 'Reservation deleted' });
      const result = await controller.deleteReservation(1);
      expect(result).toEqual({ message: 'Reservation deleted' });
    });

    it('should throw NotFoundException if reservation not found', async () => {
      mockReservationService.deleteReservation.mockRejectedValue(new NotFoundException('Reservation with ID not found'));
      await expect(controller.deleteReservation(99)).rejects.toThrow(NotFoundException);
    });
  });
});
