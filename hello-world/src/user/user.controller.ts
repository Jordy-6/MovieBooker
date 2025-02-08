/* eslint-disable prettier/prettier */
import { Controller, Post,  Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/LoginDto.dto';
import { RegisterDto } from './dto/RegisterDto.dto';
import { ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class UserController {
  
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 401, description: 'Email is already used or Password is incorrect' })
  @ApiResponse({ status: 400, description: 'Incorrect format' })
  @Post('register')
  register(@Body(new ValidationPipe()) registerDTO: RegisterDto) {
    return this.userService.register(registerDTO)
  }

  @ApiResponse({ status: 404, description: 'Email not found' })
  @ApiResponse({ status: 401, description: 'Password is incorrect' })
  @ApiResponse({ status: 201, description: 'User is connected' })
  @Post('login')
  login(@Body(new ValidationPipe()) loginDTO: LoginDto) {
    return this.userService.login(loginDTO)
  }
}
