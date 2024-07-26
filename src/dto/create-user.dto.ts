import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
