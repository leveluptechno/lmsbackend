import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PsychometricAssessment } from 'src/schemas/psychometric-assessment/psychometric-assessment.schemas';

@Injectable()
export class PsychometricAssessmentService {
  constructor(
    @InjectModel(PsychometricAssessment.name)
    private assessmentModel: Model<PsychometricAssessment>,
  ) {}

  async takeAssessment(userId: string, answers: any[]): Promise<any> {
    const result = this.calculateResult(answers);
    const newAssessment = new this.assessmentModel({
      userId,
      questions: answers.map((answer) => answer.question),
      answers: answers.map((answer) => answer.selectedOption),
      result,
    });
    return newAssessment.save();
  }

  async getResults(userId: string): Promise<any> {
    return this.assessmentModel.find({ userId }).exec();
  }

  private calculateResult(answers: any[]): string {
    const correctAnswers = answers.filter(
      (answer) => answer.correctAnswer === answer.selectedOption,
    );
    const score = (correctAnswers.length / answers.length) * 100;
    return score >= 50 ? 'Pass' : 'Fail';
  }
}
