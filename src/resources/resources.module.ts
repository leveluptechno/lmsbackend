import { Module } from '@nestjs/common';
import { FaqController } from './controller/faq.controller';
import { BlogController } from './controller/blog.controller';
import { FaqService } from './service/faq.service';
import { BlogService } from './service/blog.service';

@Module({
  controllers: [BlogController, FaqController],
  providers: [BlogService, FaqService],
})
export class ResourcesModule {}
