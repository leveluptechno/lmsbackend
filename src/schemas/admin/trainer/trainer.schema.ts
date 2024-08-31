import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainerDocument = Trainer & Document;

@Schema()
export class Trainer extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  education: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true })
  experience: number; // Years of experience

  @Prop()
  profilePic?: string; // URL of the profile picture
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
