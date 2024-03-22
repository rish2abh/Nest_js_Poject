import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
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
  dateOfBirth: string;

  @Prop({ default: true })
  isActive: boolean;

  // @Prop()
  // token: string;

  // @Prop({ type: Date, default: Date.now })
  // tokenExpiresAt: Date;

  @Prop()
  pincode: string;

  @Prop(
    raw({
      Name: { type: String },
      District: { type: String },
      Division: { type: String },
      Region: { type: String },
      State: { type: String },
      Country: { type: String },
    }),
  )
  address: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
