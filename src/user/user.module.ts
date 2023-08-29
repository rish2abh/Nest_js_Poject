import { Module} from '@nestjs/common';
import { UserController } from './Controller/addUser.controller';
import { UserService } from './Service/addUser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/Schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { GalleryController } from './Controller/photoUpload.controller';
import { GalleryService } from './Service/photoUpload.service';
import { Photo, PhotoSchema } from 'src/common/Schema/gallary.schema';
import { AuthModule } from 'src/common/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostComment, PostCommentSchema } from 'src/common/Schema/comment.schema';
import { CloudinaryService } from 'src/common/cloudnary/cloudnary';
// import { TokenId } from 'src/common/custom_decorator/token_id';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Photo.name, schema: PhotoSchema },          
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
  ],
  controllers: [UserController, GalleryController],
  providers: [UserService, GalleryService, CloudinaryService], 
})
export class UserModule {}

