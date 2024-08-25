import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PsychometricAssessmentModule } from './psychometric-assessment/psychometric-assessment.module';
import { ResourcesModule } from './resources/resources.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'sgysdgsy',
      signOptions: { expiresIn: '1d' },
    }),
    PsychometricAssessmentModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
