import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  registerUser() {}

  @Post('login')
  loginUser() {}

  @Post('forgot-password')
  forgotPassword() {}

  @Post('reset-password')
  resetPassword() {}
}
