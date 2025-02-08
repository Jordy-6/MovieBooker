import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { ReservationController } from '../src/reservation/reservation.controller';
import { ReservationService } from '../src/reservation/reservation.service';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';

describe('ReservationController - Integration Tests', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let reservationService = {
    createReservation: jest.fn().mockResolvedValue({ message: 'Reservation created' }),
    getAllUserReservations: jest.fn().mockResolvedValue({ reservations: [], message: 'All user reservations' }),
    deleteReservation: jest.fn().mockResolvedValue({ message: 'Reservation deleted' })
  };

  let token: string;
  const secretKey = 'mockSecretKey'; // Define a mock secret key for testing

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ReservationController],
      providers: [
        { provide: ReservationService, useValue: reservationService },
        {
          provide: JwtService,
          useValue: new JwtService({
            secret: secretKey, // Pass the secret key for JWT signing
            signOptions: { expiresIn: '1h' }, // Set the expiration time (optional)
          }),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = app.get<JwtService>(JwtService);

    // Mocking a user and creating a token with the mock secret key
    const mockUser = { id: 1 }; // Simulating a user
    token = jwtService.sign({ sub: mockUser.id }); // Create the JWT token using the mock secret key

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a reservation via API', async () => {
    return request(app.getHttpServer())
      .post('/reservation')
      .set('Authorization', `Bearer ${token}`) // Send the JWT token in Authorization header
      .send({ idMovie: 1, reservationStart: new Date() })
      .expect(201)
      .expect({ message: 'Reservation created' });
  });

  it('should return all user reservations via API', async () => {
    return request(app.getHttpServer())
      .get('/reservation')
      .set('Authorization', `Bearer ${token}`) // Send the JWT token in Authorization header
      .expect(200)
      .expect({ reservations: [], message: 'All user reservations' });
  });

  it('should delete a reservation via API', async () => {
    return request(app.getHttpServer())
      .delete('/reservation/1')
      .set('Authorization', `Bearer ${token}`) // Send the JWT token in Authorization header
      .expect(200)
      .expect({ message: 'Reservation deleted' });
  });

  it('should return 404 if trying to delete non-existing reservation', async () => {
    reservationService.deleteReservation.mockRejectedValue(new NotFoundException('Reservation with ID not found'));
    return request(app.getHttpServer())
      .delete('/reservation/99')
      .set('Authorization', `Bearer ${token}`) // Send the JWT token in Authorization header
      .expect(404);
  });
});
