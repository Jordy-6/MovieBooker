/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    example: 't@gmail.com'
  })
  @IsEmail(undefined, { message: 'Email must be valid'})
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    example: 'test'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Password must have atleast 4 characters' })
  password: string;
}
