import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId; // Reference to Course
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
