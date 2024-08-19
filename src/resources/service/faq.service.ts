import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFaqDto } from 'src/dto/faq/create-faq.dto';
import { UpdateFaqDto } from 'src/dto/faq/update-faq.dto';
import { Faq } from 'src/schemas/resources/faq/faq.schemas';
import { errorMessage, successMessage } from 'src/utils/response.util';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq.name) private faqModel: Model<Faq>) {}

  async findAll() {
    try {
      const faqs = await this.faqModel.find().exec();

      if (!faqs.length) {
        return errorMessage.faqNotFound;
      }

      const result = {
        msg: successMessage.faqFetched,
        faqs,
      };

      return result;
    } catch (error) {
      throw errorMessage.internalServerError;
    }
  }

  async findById(id: string) {
    try {
      const faq = await this.faqModel.findById(id);

      if (!id) {
        return errorMessage.faqNotFound;
      }

      const result = {
        msg: successMessage.faqFetched,
        faq,
      };

      return result;
    } catch (error) {
      throw errorMessage.faqNotFound;
    }
  }

  async create(createFaqDto: CreateFaqDto) {
    try {
      const newFaq = new this.faqModel(createFaqDto);

      const createdFaq = await newFaq.save();

      return successMessage.faqCreated;
    } catch (error) {
      throw errorMessage.internalServerError;
    }
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    try {
      const updatedFaq = await this.faqModel
        .findByIdAndUpdate(id, updateFaqDto, {
          new: true,
        })
        .exec();

      if (!updatedFaq) {
        return errorMessage.faqNotFound;
      }

      return successMessage.faqUpdated;
    } catch (error) {
      throw errorMessage.faqNotFound;
    }
  }

  async remove(id: string) {
    try {
      const removedFaq = await this.faqModel.findByIdAndDelete(id).exec();

      if (!removedFaq) {
        return errorMessage.faqNotFound;
      }

      return successMessage.faqDeleted;
    } catch (error) {
      throw errorMessage.faqNotFound;
    }
  }
}
