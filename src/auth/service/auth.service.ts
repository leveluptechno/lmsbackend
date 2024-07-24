import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schemas';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
private jwtService: JwtService) {}

  async signup(name: string, email: string, password: string, confirmPassword: string, phone: string) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phone,
    });

    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({email});

    if(!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id};
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'})

    user.refreshToken = refreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken,
      message: 'Login successful',
    }
  }

  async validateUser() {}

  async forgotPassword() {}

  async resetPassword() {}
}
