import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @IsString()
  @IsNotEmpty()
  readonly answer: string;
}
