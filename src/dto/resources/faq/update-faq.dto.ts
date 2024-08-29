import { IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateFaqDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  answer?: string;
}
