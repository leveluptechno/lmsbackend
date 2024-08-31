import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from '../service/student.service';
import { CreateStudentDto } from 'src/dto/admin/student/create-student.dto';

@Controller('admin/students')
export class StudentController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
}
