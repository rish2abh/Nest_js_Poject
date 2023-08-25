import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { PostCommentService } from '../Service/post.service';
import { CreatePostDto } from 'src/common/dto/userPost.dto';
import { CreatePostCommentDto } from 'src/common/dto/postComment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { TokenId } from 'src/common/custom_decorator/token_id';

@Controller('post-comment')
export class PostCommentController {
  constructor(
    private readonly postCommentService: PostCommentService,
    private readonly tokenId: TokenId,
  ) {}

  @Post('post')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image_URL'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() CreatePostDto: CreatePostDto,
    @Request() req: any,
  ) {
    try {
      let id = await this.tokenId.extract_Id(req);
      const uploadResult = await this.postCommentService.createPostUser(
        id,
        file,
        CreatePostDto,
      );
      console.log(uploadResult, 'uploadResult');

      return {
        status: true,
        uploadResult,
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        error: 'An error occurred while processing the upload.',
      };
    }
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
 async comment(
    @Body() CreatePostCommentDto: CreatePostCommentDto,
    @Request() req: any,
  ) {
    try {
      let id = await this.tokenId.extract_Id(req);
      return this.postCommentService.createPostComment(
        id,
        CreatePostCommentDto,
      );
    } catch (error) {
      console.error(error);
      return {
        status: false,
        error: 'An error occurred while creating the comment.',
      };
    }
  }
}
