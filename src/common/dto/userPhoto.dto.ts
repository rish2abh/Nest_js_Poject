import { IsNotEmpty, IsString } from 'class-validator';

export class UserPhotoDto {
  // @IsNotEmpty()
  // userID: string; 

  photoURL: string;
    
}
