/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import User from './user/user.entity'; // Import the User entity
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
    }), 
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
    MoviesModule,
    ReservationModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}
