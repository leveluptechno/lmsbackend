import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsMongoId,
  IsOptional,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsMongoId()
  @IsNotEmpty()
  course: string; // ID of the Course

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  profilePic?: string; // URL of the profile picture (optional)
}
