import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PsychometricAssessmentDocument = PsychometricAssessment & Document;

@Schema()
export class PsychometricAssessment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [String], required: true })
  questions: string[];

  @Prop({ type: [String], required: true })
  answers: string[];

  @Prop({ required: true })
  result: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PsychometricAssessmentSchema = SchemaFactory.createForClass(
  PsychometricAssessment,
);
