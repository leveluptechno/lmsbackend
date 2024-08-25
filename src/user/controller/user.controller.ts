import { Body, Controller, Get, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../service/user.service';
import { UpdateUserProfileDto } from 'src/dto/update-user-profile.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async userProfile(@Req() req: any) {
    const userId = req.user['sub'];
    return this.userService.getUserProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req: any,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const userId = req.user['sub'];
    return this.userService.updateUserProfile(userId, updateUserProfileDto);
  }
}
