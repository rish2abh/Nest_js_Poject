import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreatePostDto {
  
  @IsNotEmpty()
  @IsString()
  message: string;

  image_URL : string

}
