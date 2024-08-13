import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from 'src/dto/faq/create-faq.dto';
import { UpdateFaqDto } from 'src/dto/faq/update-faq.dto';

@Injectable()
export class FaqService {
  findAll() {
    // Logic to return all FAQs
  }

  create(createFaqDto: CreateFaqDto) {
    // Logic to create a new FAQ
  }

  update(id: string, updateFaqDto: UpdateFaqDto) {
    // Logic to update an FAQ
  }

  remove(id: string) {
    // Logic to delete an FAQ
  }
}
