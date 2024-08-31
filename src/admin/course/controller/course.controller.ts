import { Body, Controller, Post } from '@nestjs/common';
import { CoursesService } from '../service/course.controller';
import { CreateCourseDto } from 'src/dto/admin/course/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
}
