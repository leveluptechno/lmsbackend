import { IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  heading?: string;

  @IsOptional()
  @IsString()
  subHeading?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  blogImage?: string;
}
