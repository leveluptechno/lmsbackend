import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssignmentDto } from 'src/dto/admin/assignment/create-assignment.dto';
import {
  Assignment,
  AssignmentDocument,
} from 'src/schemas/admin/assignment/assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const createdAssignment = new this.assignmentModel(createAssignmentDto);
    return createdAssignment.save();
  }
}
