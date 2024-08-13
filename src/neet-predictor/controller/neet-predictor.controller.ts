import { Controller, Post, Body } from '@nestjs/common';
import { NeetPredictorService } from '../service/neet-predictor.service';
import { PredictDto } from 'src/dto/neet-predictor/predict.dto';

@Controller('neet-predictor')
export class NeetPredictorController {
  constructor(private readonly neetPredictorService: NeetPredictorService) {}

  @Post('predict')
  predict(@Body() predictionData: PredictDto) {
    return this.neetPredictorService.predict(predictionData);
  }
}
