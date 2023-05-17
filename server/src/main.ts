import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
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
  await app.listen(5000);
}
bootstrap();
