import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserProfileDto } from 'src/dto/update-user-profile.dto';
import { User, UserDocument } from 'src/schemas/user/user.schemas';
import { errorMessage, successMessage } from 'src/utils/response.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password -confirmPassword');

    if (!user) {
      throw errorMessage.userNotFound;
    }
    return user;
  }

  async updateUserProfile(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateUserProfileDto, { new: true })
      .select('-password -confirmPassword');

    if (!user) {
      throw errorMessage.userNotFound;
    }
    return {
      msg: successMessage.profileUpdated,
      user,
    };
  }
}
