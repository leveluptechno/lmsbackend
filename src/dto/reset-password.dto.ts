import { IsString, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string;
}
