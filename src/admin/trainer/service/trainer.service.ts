import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainerDto } from 'src/dto/admin/trainer/create-trainer.dto';
import {
  Trainer,
  TrainerDocument,
} from 'src/schemas/admin/trainer/trainer.schema';

@Injectable()
export class TrainersService {
  constructor(
    @InjectModel(Trainer.name) private trainerModel: Model<TrainerDocument>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const createdTrainer = new this.trainerModel(createTrainerDto);
    return createdTrainer.save();
  }
}
