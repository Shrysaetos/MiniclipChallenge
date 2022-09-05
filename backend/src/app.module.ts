import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          migrationsRun: true,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          migrations: ['dist/database/migrations/*{.ts,.js}'],
          migrationsTableName: 'TYPEORM_MIGRATIONS',
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
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
