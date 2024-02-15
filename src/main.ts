import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
const port = process.env.PORT;
// const httpsOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/picture-diary.site/privkey.pem'),
//   cert: fs.readFileSync(
//     '/etc/letsencrypt/live/picture-diary.site/fullchain.pem',
//   ),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //  httpsOptions,
  });
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:5173',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
