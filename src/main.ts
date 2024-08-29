import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
  await app.listen(4000);
}
bootstrap();
