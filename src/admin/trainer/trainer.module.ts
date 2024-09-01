import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Trainer,
  TrainerSchema,
} from 'src/schemas/admin/trainer/trainer.schema';
import { User, UserSchema } from 'src/schemas/user/user.schemas';
import { TrainersService } from './service/trainer.service';
import { TrainersController } from './controller/trainer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Trainer.name,
        schema: TrainerSchema,
      },
    ]),
  ],
  providers: [TrainersService],
  controllers: [TrainersController],
})
export class TrainerModule {}
