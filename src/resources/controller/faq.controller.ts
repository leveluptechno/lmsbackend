import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FaqService } from '../service/faq.service';
import { CreateFaqDto } from 'src/dto/faq/create-faq.dto';
import { UpdateFaqDto } from 'src/dto/faq/update-faq.dto';

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

  @Post() //admin
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id') //admin
  async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id') //admin
  async remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
