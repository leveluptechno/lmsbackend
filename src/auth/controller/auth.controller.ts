import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post('signup')
  async registerUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('phone') phone: string
  ) {
    return this.authService.signup(name, email, password, confirmPassword, phone);
  }

  @Post('login')
  async loginUser(
    @Body('email')email: string,
    @Body('password')password: string
  ) {
    return this.authService.login(email,password);
  }

  @Post('forgot-password')
  async forgotPassword() {}

  @Post('reset-password')
  async resetPassword() {}
}
