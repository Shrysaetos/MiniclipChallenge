import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

import AppDataSource from './database/data-source';

async function bootstrap() {
  AppDataSource.initialize()
    .then(async () => {
      console.log('App Data Source has been initialized.');
    })
    .catch((err) =>
      console.error('Error during App Data Source initialization:', err),
    );

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
