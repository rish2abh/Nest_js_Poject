import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Photo } from 'src/common/Schema/gallary.schema';
import { CloudinaryService } from 'src/common/cloudnary/cloudnary';

@Injectable()
export class GalleryService {

  constructor(
    @InjectModel(Photo.name) private userPhotoModel: Model<Photo>,
     private readonly CloudinaryService : CloudinaryService
  ) {}

  async uploadPhoto(id: string, file: any) {
    try {
      const photo = await this.CloudinaryService.upload(file);
      console.log(photo, "fsgfyu");

      const userObjectID = new Types.ObjectId(id);

      const updateResult = await this.userPhotoModel.updateMany(
        {
          isActive: true,
          userID: userObjectID,
        },
        {
          $set: {
            isActive: false,
          },
        }
      );

      const image = await this.userPhotoModel.create({
        photoURL: photo,
        userID: userObjectID,
        isActive: true,
      });

      return {
        status: true,
        data: image,
      };
    } catch (error) {
  
      console.error('Error in uploadPhoto:', error.message);
      throw new Error('Unable to upload photo');
    }
  }
}
    
  
  


  
  
