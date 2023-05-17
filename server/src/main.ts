import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cors({
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // }));
  const corsOptions:CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow requests with credentials
  }
  // app.use(cookieParser())
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
