import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserPhotoDto } from 'src/common/dto/userPhoto.dto';
import { GalleryService } from '../Service/photoUpload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { TokenId } from 'src/common/custom_decorator/token_id';

@Controller('userGallery')
export class GalleryController {
  constructor(private readonly GalleryService: GalleryService,
      private readonly tokenId : TokenId) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photoURL'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() userPhotoDTO: UserPhotoDto,
    @Request() req: any,
  ) {
    try {
      let id = await this.tokenId.extract_Id(req)
      const uploadResult = await this.GalleryService.uploadPhoto( id, file, userPhotoDTO);
      console.log(uploadResult, 'uploadResult');

      return {
        status: true,
        uploadResult,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid file type.');
      } else {
        // Handle other errors here
        throw error;
      }
    }
  }
}
