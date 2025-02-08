/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('test1')
  getHello(): string {
    return this.appService.getHello();
  }
}
