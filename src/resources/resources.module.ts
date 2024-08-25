import { Module } from '@nestjs/common';
import { FaqController } from './controller/faq.controller';
import { BlogController } from './controller/blog.controller';
import { FaqService } from './service/faq.service';
import { BlogService } from './service/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/schemas/resources/blog/blog.schemas';
import { Faq, FaqSchema } from 'src/schemas/resources/faq/faq.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
  ],
  controllers: [BlogController, FaqController],
  providers: [BlogService, FaqService],
})
export class ResourcesModule {}
