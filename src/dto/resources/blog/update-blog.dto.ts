import { IsString, IsOptional } from '@nestjs/class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;
}
