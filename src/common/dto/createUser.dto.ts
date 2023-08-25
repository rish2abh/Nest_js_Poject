  import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate } from 'class-validator';
  import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments , registerDecorator, ValidationOptions } from 'class-validator';
  import { IsValidDateConstraint } from '../dto/custom-validators/custom-validators';


  export class CreateUserDto {
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
      message: 'First name should only contain alphabetic characters and spaces.'
    })
    @IsNotEmpty()
    first_name: string;



  @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
      message: 'Last name should only contain alphabetic characters and spaces.'
    })
    @IsNotEmpty()
    last_name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @Length(10, 10, {
      message: 'Phone number should contain exactly 10 digits.'
    })
    @Matches(/^[7-9]\d{9}$/, {
      message: 'Phone number should start with a digit between 7 and 9.'
    })
    phone_no: string;


    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message: 'Password too weak: eg. Password123'
    })
    password: string;
    


    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format. Please use YYYY-MM-DD format.'
    })
    @Validate(IsValidDateConstraint, {
      message: 'Date of birth cannot exceed the current date.'
    })  
    dateOfBirth: string;  // Format: YYYY-MM-DD

  }

  export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
  }

