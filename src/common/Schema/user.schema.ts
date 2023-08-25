import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class User extends Document {
 
  @Prop()
  first_name: string;
  
  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone_no: number;

  @Prop()
  password: string;
  
  @Prop({ type: String, format: 'date' }) 
  dateOfBirth: string

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
