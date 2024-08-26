import { IsString, MinLength } from '@nestjs/class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
