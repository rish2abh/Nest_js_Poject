import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreatePostDto {
  // @IsNotEmpty()
  // userID: string; 

  @IsNotEmpty()
  @IsString()
  message: string;

  image_URL : string

}
