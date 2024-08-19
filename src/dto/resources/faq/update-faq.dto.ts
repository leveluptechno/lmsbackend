import { IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateFaqDto {
  @IsString()
  @IsOptional()
  readonly question?: string;

  @IsString()
  @IsOptional()
  readonly answer?: string;
}
