import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from '../service/faq.service';

import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateFaqDto } from 'src/dto/resources/faq/create-faq.dto';
import { UpdateFaqDto } from 'src/dto/resources/faq/update-faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.faqService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post() //admin
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id') //admin
  async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id') //admin
  async remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
