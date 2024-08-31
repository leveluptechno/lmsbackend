import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateTrainerDto {
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

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  education: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsNotEmpty()
  experience: number; // Years of experience

  @IsString()
  @IsOptional()
  profilePic?: string; // URL of the profile picture (optional)
}
