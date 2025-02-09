/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { RegisterDto } from './dto/RegisterDto.dto';
import { LoginDto } from './dto/LoginDto.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}
    
    async register(registerDTO: RegisterDto): Promise<any> {
        const {name, email, password} = registerDTO;

        const userAlreadyExist = await this.userRepository.findOneBy({email});

        if(userAlreadyExist){
            throw new UnauthorizedException('Email is already used')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return { message : 'User registered successfully' };
    }

    async login(loginDTO: LoginDto): Promise<any> {
        const { email, password } = loginDTO;

        const user = await this.userRepository.findOneBy({email});

        if(!user){
            throw new NotFoundException('Email is not found')
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new UnauthorizedException('Password is incorrect')
        }

        const token = this.jwtService.sign({id: user.id});
        return { "token" : token };
    }
}
