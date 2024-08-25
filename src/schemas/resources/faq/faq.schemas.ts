import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Faq extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ default: true })
  answer: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
