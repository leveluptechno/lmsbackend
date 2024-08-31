import { Module } from '@nestjs/common';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';

@Module({
  imports: [],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
