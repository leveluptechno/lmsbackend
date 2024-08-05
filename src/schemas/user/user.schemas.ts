import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmPassword: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  resetToken?: string; // for reset password

  @Prop()
  resetTokenExpires?: Date; // Token expire time
}

export const UserSchema = SchemaFactory.createForClass(User);
