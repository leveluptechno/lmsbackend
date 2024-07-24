import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schemas';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
