import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';

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
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Put(':id') //admin
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id') //admin
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
