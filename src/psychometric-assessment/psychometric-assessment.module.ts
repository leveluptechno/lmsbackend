import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PsychometricAssessment,
  PsychometricAssessmentSchema,
} from 'src/schemas/psychometric-assessment/psychometric-assessment.schemas';
import { PsychometricAssessmentService } from './service/psychometric-assessment.service';
import { PsychometricAssessmentController } from './controller/psychometric-assessment.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/schemas/user/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'sgysdgsy',
      signOptions: { expiresIn: '1d', algorithm: 'HS256' },
    }),
    MongooseModule.forFeature([
      {
        name: PsychometricAssessment.name,
        schema: PsychometricAssessmentSchema,
      },
    ]),
  ],
  controllers: [PsychometricAssessmentController],
  providers: [PsychometricAssessmentService],
})
export class PsychometricAssessmentModule {}
