import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostCommentDto {
  @IsNotEmpty()
  postId: string;

  // @IsNotEmpty()
  // userId: string;

  
  @IsNotEmpty()
  @IsString()
  comment: string;
}
