import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/common/Schema/user.schema';
import { CreateUserDto, LoginDto } from 'src/common/dto/createUser.dto';
import * as crypto from 'crypto';
import { AuthService } from 'src/common/auth/auth.service';
import { PostComment } from 'src/common/Schema/comment.schema';
import axiso from 'axios';

import axios from 'axios';
import { MailService } from 'src/common/mailService/nodemailer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(PostComment.name) private postCommentModel: Model<PostComment>,
    private readonly authservice: AuthService,
    private readonly mailService: MailService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.userModel.find({ email: createUserDto.email });
    if (checkUser.length > 0) {
      return {
        status: false,
        message: 'email already exist',
      };
    }
    const hashedPassword = crypto
      .createHash('sha256')
      .update(createUserDto.password)
      .digest('hex');

    const address = await axios({
      method: 'get',
      url: `https://api.postalpincode.in/pincode/${createUserDto.pincode}`,
    })
      .then((response) => {
        return response.data[0]?.PostOffice[0] || null;
      })
      .catch((error) => {
        console.log(error);
        ``;
      });

    console.log(address, 'address');

    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
      address: address,
    };

    const createdUser = new this.userModel(userWithHashedPassword);
    const data = await createdUser.save();
    const token = await this.authservice.genrateToken(data);
    const updateToken = await this.userModel.updateOne(
      { _id: data._id },
      {
        $set: {
          token: token.acessToken,
        },
      },
    );
    console.log(token.acessToken, 'update');
    return {
      data: data,
      token: token.acessToken,
    };
  }
  async googleSignUp(User) {
    const token = await this.authservice.genrateToken(User.emails[0].value);
    console.log(token.acessToken, 'update');
    return {
      // data: data ,
      token: token.acessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const valUser = await this.userModel.findOne({ email: loginDto.email });
    console.log(valUser, 'valuser');

    if (!valUser) {
      throw new Error('User not found');
    }
    const hashedPassword = crypto
      .createHash('sha256')
      .update(loginDto.password)
      .digest('hex');

    if (hashedPassword !== valUser.password) {
      throw new Error('Invalid credentials');
    }

    const token = await this.authservice.genrateToken(valUser);
    console.log(token, 'token');

    const updateToken = await this.userModel
      .updateOne
          // { _id: valUser._id },
          // { $set: { token: token.acessToken } },
      ();

    const emailContent = `Welcome to our platform!`;
    this.mailService.sendMail(loginDto.email, 'Welcome', emailContent);

    return {
      status: 'success',
      message: 'Login successful',
      data: { token },
    };
  }

  async userData(id: string) {
    try {
      console.log(id, 'userId');
      const userId = new Types.ObjectId(id);

      const list = await this.userModel.aggregate([
        { $match: { _id: userId } },
        {
          $project: {
            token: 0,
          },
        },
        {
          $lookup: {
            from: 'photos',
            localField: '_id',
            foreignField: 'userID',
            as: 'All_Photos',
          },
        },
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'userID',
            as: 'all_UserPost',
            pipeline: [
              {
                $lookup: {
                  from: 'postcomments',
                  localField: '_id',
                  foreignField: 'postId',
                  as: 'all_comments',
                },
              },
            ],
          },
        },
      ]);

      return {
        status: 'success',
        message: 'Data fetched successfully',
        data: list,
      };
    } catch (error) {
      // Handle errors here
      console.error('Error in userData:', error.message);
      throw new Error('Unable to fetch user data');
    }
  }
}
