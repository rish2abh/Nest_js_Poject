import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type PhotoDocument = Photo & Document;

@Schema({ timestamps: true })
export class Photo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name }) // Reference to the User schema
  userID: Types.ObjectId;


  @Prop()
  photoURL: string;

  @Prop({default : false})
  isActive: boolean;

}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
