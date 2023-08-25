import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Photo } from 'src/common/Schema/gallary.schema';
import { UserPhotoDto } from 'src/common/dto/userPhoto.dto';
import {  v2 as cloudinary, v2 } from 'cloudinary';
import { resolve } from 'path';

@Injectable()
export class CloudinaryService {

  constructor(
  ) {cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })}



  async upload(file: Express.Multer.File) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG, GIF, MP4, and WEBM are allowed.');
    } 
    return new Promise((resolve) => {
      v2.uploader.upload_stream(
        {
          folder: 'System_gallery', // Add the folder
          resource_type: 'auto',
        },
        async (error, result) => {
          if (error) {    
            console.log(error);
            
          } else {
              console.log('Uploaded photo URL:', result.secure_url);
              resolve  (result.secure_url)
          }
        }
      ).end(file.buffer);
    });
  }
}

  
  
