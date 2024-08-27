import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { CreateBlogDto } from 'src/dto/resources/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/resources/blog/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middleware/multer.middleware';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post() // admin
  @UseInterceptors(FileInterceptor('blogImage', { storage }))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.create(createBlogDto, file);
  }

  @Put(':id') // admin
  @UseInterceptors(FileInterceptor('blogImage', { storage }))
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.update(id, updateBlogDto, file);
  }

  @Delete(':id') // admin
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
