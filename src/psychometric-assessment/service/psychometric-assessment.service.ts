import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PsychometricAssessment } from 'src/schemas/psychometric-assessment/psychometric-assessment.schemas';
import { errorMessage, successMessage } from 'src/utils/response.util';

@Injectable()
export class PsychometricAssessmentService {
  constructor(
    @InjectModel(PsychometricAssessment.name)
    private assessmentModel: Model<PsychometricAssessment>,
  ) {}

  async takeAssessment(userId: string, answers: any[]): Promise<any> {
    try {
      const result = this.calculateResult(answers);
      const newAssessment = new this.assessmentModel({
        userId,
        questions: answers.map((answer) => answer.question),
        answers: answers.map((answer) => answer.selectedOption),
        result,
      });
      await newAssessment.save();
      return {
        ...successMessage.assessmentTaken,
        data: newAssessment,
      };
    } catch (error) {
      throw new HttpException(
        errorMessage.internalServerError.message,
        errorMessage.internalServerError.statusCode,
      );
    }
  }

  async getResults(userId: string): Promise<any> {
    try {
      const assessments = await this.assessmentModel.find({ userId }).exec();
      if (!assessments || assessments.length === 0) {
        throw new HttpException(
          errorMessage.assessmentNotFound.message,
          errorMessage.assessmentNotFound.statusCode,
        );
      }
      return {
        ...successMessage.assessmentFetched,
        data: assessments,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        errorMessage.internalServerError.message,
        errorMessage.internalServerError.statusCode,
      );
    }
  }

  private calculateResult(answers: any[]): string {
    const correctAnswers = answers.filter(
      (answer) => answer.correctAnswer === answer.selectedOption,
    );
    const score = (correctAnswers.length / answers.length) * 100;
    return score >= 50 ? 'Pass' : 'Fail';
  }
}
