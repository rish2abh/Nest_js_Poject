import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';

export type CommentDocument = PostComment & Document;

@Schema({ timestamps: true })
export class PostComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name }) // Reference to the Post schema
  postId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name }) // Reference to the User schema
  userId: Types.ObjectId;

  @Prop()
  comment : string;

}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
