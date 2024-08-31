import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsDate,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dueDate: Date;

  @IsMongoId()
  @IsNotEmpty()
  course: string; // ID of the Course
}
