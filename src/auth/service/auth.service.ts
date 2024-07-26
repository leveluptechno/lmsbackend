import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schemas';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { errorMessage, successMessage } from 'src/utils/response.util';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class AuthService {
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
    // console.log(user);

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

  async forgotPassword() {}

  async resetPassword() {}
}
