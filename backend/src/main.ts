import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

import AppDataSource from './database/data-source';

async function bootstrap() {
  console.log(__dirname);

  AppDataSource.initialize()
    .then(() => console.log('App Data Source has been initialized.'))
    .catch((err) =>
      console.error('Error during App Data Source initialization:', err),
    );

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
