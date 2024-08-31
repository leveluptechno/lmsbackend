import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssignmentDto } from 'src/dto/admin/assignment/create-assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }
}
