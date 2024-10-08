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
    const { name, password, email, phone, confirmPassword, address, city } =
      createUserDto;

    if (password !== confirmPassword) {
      return errorMessage.passwordMismatch;
    }

    //now check if the user already exist or not

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      return errorMessage.userAlreadyExists;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phone,
      role: 'user', // default role for everyone is a 'user'
      address,
      city,
    });

    await newUser.save();
    return successMessage.userCreated;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    // console.log(user);

    if (!user) {
      return errorMessage.userNotFound;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorMessage.unauthorizedError;
    }

    const payload = { email: user.email, sub: user._id, role: user.role }; // return role here in token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

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
      return errorMessage.userNotFound;
    }

    const resetToken = crypto.randomUUID().toString();
    const resetTokenExpires = new Date(Date.now() + 3600000); //1hr

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // frontend url for reset password page with token as a query param
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    });

    return successMessage.forgotpasswordMessage;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    const { newPassword, confirmPassword } = resetPasswordDto;

    if (!token) {
      return errorMessage.invalidAuthToken;
    }

    if (newPassword !== confirmPassword) {
      return errorMessage.passwordMismatch;
    }

    const user = await this.userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return errorMessage.invalidAuthToken;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.confirmPassword = user.password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return successMessage.passwordReset;
  }
}
