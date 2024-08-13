import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { PsychometricAssessmentService } from '../service/psychometric-assessment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('psychometric-assessment')
export class PsychometricAssessmentController {
  constructor(
    private readonly psychometricAssessmentService: PsychometricAssessmentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('take')
  async takeAssessment(@Req() req: any, @Body('answers') answers: any[]) {
    const userId = req.user['sub'];
    return this.psychometricAssessmentService.takeAssessment(userId, answers);
  }

  @UseGuards(AuthGuard)
  @Get('results')
  async getResults(@Req() req: any) {
    const userId = req.user['sub'];
    return this.psychometricAssessmentService.getResults(userId);
  }
}
