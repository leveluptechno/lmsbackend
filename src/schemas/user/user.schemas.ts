//src/user/user.schem.ts
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
  refreshToken?: string; // added this field for storing refreshToken
}

export const UserSchema = SchemaFactory.createForClass(User);
