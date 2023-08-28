import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostCommentService } from '../Service/post.service';
import { CreatePostDto } from 'src/common/dto/userPost.dto';
import { CreatePostCommentDto } from 'src/common/dto/postComment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { ExtractUserId } from 'src/common/custom_decorator/token_id';

@ApiBearerAuth()
@ApiTags('Post-Commnet')
@Controller('post-comment')
@UseGuards(JwtAuthGuard)
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}


  @Post('post')
  @UseInterceptors(FileInterceptor('image_URL'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() CreatePostDto: CreatePostDto,
    @ExtractUserId() userId: string,
  ) {
    return this.postCommentService.createPostUser(userId, file, CreatePostDto);
  }

  @Post('comment')
  comment(
    @Body() CreatePostCommentDto: CreatePostCommentDto,
    @ExtractUserId() userId: string,
  ) {
    return this.postCommentService.createPostComment(
      userId,
      CreatePostCommentDto,
    );
  }
}
