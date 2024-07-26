import { IsString, IsNotEmpty, IsEmail, IsOptional } from '@nestjs/class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;
}
