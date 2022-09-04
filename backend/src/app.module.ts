import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { ImageReportModule } from './imageReport/imageReport.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [__dirname + '/../database/migrations/*.ts'],
      migrationsTableName: 'TYPEORM_MIGRATIONS',
      autoLoadEntities: true,
    }),
    UserModule,
    ImageReportModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
