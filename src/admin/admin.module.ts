import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schemas';
import { AssignmentModule } from './assignment/assignment.module';
import { TrainerModule } from './trainer/trainer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AssignmentModule,
    TrainerModule,
  ],
  providers: [],
  controllers: [],
})
export class AdminModule {}
