import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssignmentDto } from 'src/dto/admin/assignment/create-assignment.dto';
import { AssignmentsService } from '../service/assignment.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('create-assignment')
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }
}
