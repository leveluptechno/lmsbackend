import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Trainer', required: true })
  instructor: Types.ObjectId; // Reference to Trainer

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
