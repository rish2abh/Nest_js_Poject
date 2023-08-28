import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostComment } from 'src/common/Schema/comment.schema';
import { Post } from 'src/common/Schema/post.schema';
import { User } from 'src/common/Schema/user.schema';
import { CloudinaryService } from 'src/common/cloudnary/cloudnary';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    @InjectModel(PostComment.name) private CommentModel: Model<Comment>,
    private readonly CloudinaryService : CloudinaryService
  ) {}

  async createPostUser(id,file ,CreatePostDto) {
    try {
      const userId = new  Types.ObjectId(id)
      const photo = await this.CloudinaryService.upload(file);
      const newPostData = {
        ...CreatePostDto,
        image_URL: photo,
        userID : userId
      };
      const savedPost = await this.PostModel.create(newPostData); // Use the PostModel to create the post
      return {
        status: 'success',
        message: 'Post created successfully',
        data: savedPost,
      };
    } catch (error) {
      console.error('Error creating post user:', error.message);
      throw new HttpException(
        'Failed to create post user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPostComment(id, createPostCommentDto) {
    try {
      const userId = new Types.ObjectId(id);
      const postId = new Types.ObjectId( createPostCommentDto.postId)
      
      const checkpost = await this.PostModel.find({_id :postId})
      
      if(checkpost.length<= 0 ){
        return new HttpException('No such post found.', HttpStatus.BAD_GATEWAY);
        }
      
      const postComment = new this.CommentModel({
        ...createPostCommentDto,
        userId: id,
      });

      const comment = await postComment.save();

      return {
        success: true,
        message: 'Post comment created successfully.',
        data: comment,
      };
    } catch (error) {
      console.error('Error creating post comment:', error.message);
      throw new HttpException('Failed to create post comment.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

