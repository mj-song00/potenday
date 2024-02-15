import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
const port = process.env.PORT;
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/picture-diary.site/privkey.pem'),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/picture-diary.site/fullchain.pem',
  ),
  passphrase: process.env.PASS_KEY,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
