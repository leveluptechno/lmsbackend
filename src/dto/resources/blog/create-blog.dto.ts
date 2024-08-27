import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  subHeading?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  blogImage: string;
}
