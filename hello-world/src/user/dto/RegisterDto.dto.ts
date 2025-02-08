/* eslint-disable prettier/prettier */
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

@ApiSchema({ description: 'Description of the RegisterDto schema' })
export class RegisterDto {
  
  @ApiProperty(
    {
      description: 'Name of the user',
      type: String,
      required: true,
      example: 'Jean'
    }
  )
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters' })
  name: string;

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
