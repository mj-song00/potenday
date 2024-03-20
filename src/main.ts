import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
