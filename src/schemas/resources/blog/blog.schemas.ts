import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop({ required: true, trim: true })
  heading: string;

  @Prop({ default: '' })
  subHeading: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogImage: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
