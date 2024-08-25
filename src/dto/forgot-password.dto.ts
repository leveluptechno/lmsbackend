import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
