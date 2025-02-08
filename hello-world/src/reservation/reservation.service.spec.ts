import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import Reservation from './reservation.entity';
import { ReservationDto } from './dto/ReservationDto.dto';
import { NotFoundException } from '@nestjs/common';

const mockReservationRepository = {
  findBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
};

describe('Unit Tests - ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: getRepositoryToken(Reservation), useValue: mockReservationRepository },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  describe('createReservation', () => {
    it('should create a reservation', async () => {
      mockReservationRepository.findBy.mockResolvedValue([]);
      mockReservationRepository.create.mockReturnValue({});
      mockReservationRepository.save.mockResolvedValue({ message: 'Reservation created' });
      const reservationDto: ReservationDto = { idMovie: 1, reservationStart: new Date() };
      const result = await service.createReservation(reservationDto, 1);
      expect(result).toEqual({ message: 'Reservation created' });
    });
  });

  describe('getAllUserReservations', () => {
    it('should return all user reservations', async () => {
      mockReservationRepository.findBy.mockResolvedValue([{ id: 1 }]);
      const result = await service.getAllUserReservations(1);
      expect(result).toEqual({ reservations: [{ id: 1 }], message: 'All user reservations' });
    });

    it('should throw NotFoundException if no reservations exist', async () => {
      mockReservationRepository.findBy.mockResolvedValue([]);
      await expect(service.getAllUserReservations(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation', async () => {
      mockReservationRepository.findBy.mockResolvedValue([{ id: 1 }]);
      mockReservationRepository.delete.mockResolvedValue({});
      const result = await service.deleteReservation(1);
      expect(result).toEqual({ message: 'Reservation deleted' });
    });

    it('should throw NotFoundException if reservation not found', async () => {
      mockReservationRepository.findBy.mockResolvedValue([]);
      await expect(service.deleteReservation(99)).rejects.toThrow(NotFoundException);
    });
  });
});

// Integration Tests

describe('Integration Tests - ReservationService', () => {
  let service: ReservationService;
  let repository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: getRepositoryToken(Reservation), useValue: mockReservationRepository },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should successfully create a reservation', async () => {
    mockReservationRepository.findBy.mockResolvedValue([]);
    mockReservationRepository.create.mockReturnValue({});
    mockReservationRepository.save.mockResolvedValue({ message: 'Reservation created' });
    const reservationDto: ReservationDto = { idMovie: 1, reservationStart: new Date() };
    const result = await service.createReservation(reservationDto, 1);
    expect(result).toEqual({ message: 'Reservation created' });
  });

  it('should fetch user reservations', async () => {
    mockReservationRepository.findBy.mockResolvedValue([{ id: 1 }]);
    const result = await service.getAllUserReservations(1);
    expect(result).toEqual({ reservations: [{ id: 1 }], message: 'All user reservations' });
  });

  it('should delete a reservation', async () => {
    mockReservationRepository.findBy.mockResolvedValue([{ id: 1 }]);
    mockReservationRepository.delete.mockResolvedValue({});
    const result = await service.deleteReservation(1);
    expect(result).toEqual({ message: 'Reservation deleted' });
  });
});
