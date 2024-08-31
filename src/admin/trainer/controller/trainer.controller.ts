import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrainerDto } from 'src/dto/admin/trainer/create-trainer.dto';
import { TrainersService } from '../service/trainer.service';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }
}
