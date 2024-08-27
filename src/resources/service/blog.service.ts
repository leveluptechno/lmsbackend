import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateBlogDto } from 'src/dto/resources/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/resources/blog/update-blog.dto';

import { Blog } from 'src/schemas/resources/blog/blog.schemas';
import { uploadOnCloudinary } from 'src/utils/cloudinary';
import { errorMessage, successMessage } from 'src/utils/response.util';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll() {
    const blogs = await this.blogModel.find().exec();

    if (blogs.length === 0) {
      return errorMessage.blogNotFound;
    }

    return {
      blogs,
      message: successMessage.blogsFetched,
    };
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      return errorMessage.blogNotFound;
    }
    return {
      blog,
      message: successMessage.blogFetched,
    };
  }

  async create(createBlogDto: CreateBlogDto, file: Express.Multer.File) {
    try {
      const { heading, content, subHeading } = createBlogDto;

      const localImagePath = file?.path;

      if (!localImagePath) {
        return {
          message: 'Blog image is not provided',
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        };
      }

      const url = await uploadOnCloudinary(localImagePath);

      const blog = await this.blogModel.create({
        heading,
        content,
        subHeading,
        blogImage: url,
      });

      if (!blog) {
        return errorMessage.blogCreationFailed;
      }

      return {
        blog,
        message: successMessage.blogCreated,
      };
    } catch (error) {
      console.error('Error creating blog:', error);
      return errorMessage.blogCreationFailed;
    }
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
    file: Express.Multer.File,
  ) {
    try {
      const { heading, content, subHeading } = updateBlogDto;

      const blog = await this.blogModel.findById(id);

      if (!blog) {
        return errorMessage.blogNotFound;
      }

      const imageLocalPath = file?.path;
      let blogImage = blog.blogImage;

      if (imageLocalPath) {
        const url = await uploadOnCloudinary(imageLocalPath);
        blogImage = url;
      }

      const updatedBlog = {
        heading: heading || blog.heading,
        content: content || blog.content,
        subHeading: subHeading || blog.subHeading,
        blogImage: blogImage,
      };

      await blog.updateOne(updatedBlog);

      return successMessage.blogUpdated;
    } catch (error) {
      console.error('Error updating blog:', error);
      return errorMessage.blogUpdatationFailed;
    }
  }

  async remove(id: string) {
    try {
      const blog = await this.blogModel.findByIdAndDelete(id).exec();
      if (!blog) {
        return errorMessage.blogNotFound;
      }
      return successMessage.blogDeleted;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return errorMessage.blogDeletionFailed;
    }
  }
}
