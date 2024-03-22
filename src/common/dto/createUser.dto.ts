import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidDateConstraint } from '../dto/custom-validators/custom-validators';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'First name should only contain alphabetic characters and spaces.',
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Last name should only contain alphabetic characters and spaces.',
  })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  @Length(10, 10, {
    message: 'Phone number should contain exactly 10 digits.',
  })
  @Matches(/^[7-9]\d{9}$/, {
    message: 'Phone number should start with a digit between 7 and 9.',
  })
  phone_no: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
    message: 'Password too weak: e.g., Password123',
  })
  password: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Please use YYYY-MM-DD format.',
  })
  @Validate(IsValidDateConstraint, {
    message: 'Date of birth cannot exceed the current date.',
  })
  dateOfBirth: string; // Format: YYYY-MM-DD

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @Length(6, 6, {
    message: 'Pincode must be six numbers long',
  })
  pincode: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty()
  password: string;
}
