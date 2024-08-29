import { Module } from '@nestjs/common';
import { FaqController } from './controller/faq.controller';
import { BlogController } from './controller/blog.controller';
import { FaqService } from './service/faq.service';
import { BlogService } from './service/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/schemas/resources/blog/blog.schemas';
import { Faq, FaqSchema } from 'src/schemas/resources/faq/faq.schemas';
import { User, UserSchema } from 'src/schemas/user/user.schemas';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'sgysdgsy',
      signOptions: { expiresIn: '1d', algorithm: 'HS256' },
    }),
  ],
  controllers: [BlogController, FaqController],
  providers: [BlogService, FaqService],
})
export class ResourcesModule {}
