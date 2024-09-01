import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schemas';
import { AssignmentsController } from './controller/assignment.controller';
import { AssignmentsService } from './service/assignment.service';
import {
  Assignment,
  AssignmentSchema,
} from 'src/schemas/admin/assignment/assignment.schema';

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
        name: Assignment.name,
        schema: AssignmentSchema,
      },
    ]),
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentModule {}
