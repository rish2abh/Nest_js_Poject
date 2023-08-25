import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate <= currentDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date of birth cannot exceed the current date.';
  }
}
