import { Module } from '@nestjs/common';
import { StudentsService } from './service/student.service';
import { StudentController } from './controller/student.controller';

@Module({
  imports: [],
  providers: [StudentsService],
  controllers: [StudentController],
})
export class StudentModule {}
