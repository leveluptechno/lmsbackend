import { Module } from '@nestjs/common';
import { NeetPredictorController } from './controller/neet-predictor.controller';
import { NeetPredictorService } from './service/neet-predictor.service';

@Module({
  controllers: [NeetPredictorController],
  providers: [NeetPredictorService],
})
export class NeetPredictorModule {}
