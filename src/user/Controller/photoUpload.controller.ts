import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from '../Service/photoUpload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { ExtractUserId } from 'src/common/custom_decorator/token_id';
import { ApiTags } from '@nestjs/swagger';

@Controller('userGallery')
@ApiTags('UserProfilePic')
export class GalleryController {
  constructor(private readonly GalleryService: GalleryService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photoURL'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @ExtractUserId() userId: string,
  ) {
    return this.GalleryService.uploadPhoto(userId, file);
  }
}
