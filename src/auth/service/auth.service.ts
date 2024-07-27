import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schemas';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { errorMessage, successMessage } from 'src/utils/response.util';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { ForgotPasswordDto } from 'src/dto/forgot-password.dto';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { name, password, email, phone, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw errorMessage.passwordMismatch;
    }

    //now check if the user already exist or not

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw errorMessage.userAlreadyExists;
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
    return successMessage.userCreated;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    console.log(user);

    if (!user) {
      throw errorMessage.userNotFound;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw errorMessage.unauthorizedError;
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    const result = {
      msg: successMessage.userLoggedIn,
      user: userResponse,
      accessToken,
    };

    return result;
  }

  async validateUser() {}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw errorMessage.userNotFound;
    }

    const resetToken = crypto.randomUUID().toString();
    const resetTokenExpires = new Date(Date.now() + 3600000); //1hr

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `https://localhost:3000/auth/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    });

    return successMessage.forgotpasswordMessage;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    const { newPassword } = resetPasswordDto;

    if (!token) {
      throw errorMessage.invalidAuthToken;
    }

    const user = await this.userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw errorMessage.invalidAuthToken;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.confirmPassword = user.password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return successMessage.passwordReset;
  }
}
