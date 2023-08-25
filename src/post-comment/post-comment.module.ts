import { Module } from '@nestjs/common';
import { PostCommentController } from './Controller/post.controller';
import { PostCommentService } from './Service/post.service';
import { AuthModule } from 'src/common/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/common/Schema/post.schema';
import { PostComment, PostCommentSchema } from 'src/common/Schema/comment.schema';
import { User, UserSchema } from 'src/common/Schema/user.schema';
import { CloudinaryService } from 'src/common/cloudnary/cloudnary';
import { TokenId } from 'src/common/custom_decorator/token_id';


@Module({
  imports : [AuthModule,MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
    { name: PostComment.name, schema: PostCommentSchema },
    // { name: User.name, schema: UserSchema },
  ]),],
  controllers: [PostCommentController],
  providers: [PostCommentService,CloudinaryService,TokenId]
})
export class PostCommentModule {}
