import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './AllExceptionsFilter';
import { AppModule } from './app.module';

import { order_host } from './config';

async function bootstrap() {
  // Create order microservice
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: order_host,
      port: 8876,
    },
  });

  // Setup order module
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.startAllMicroservicesAsync();

  await app.listen(8877);
}
bootstrap();
