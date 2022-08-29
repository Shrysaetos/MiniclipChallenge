import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
//import { UserModule } from './user/user.service';
import { ImageReportController } from './imageReport/imageReport.controller';
import { ImageReportModule } from './imageReport/imageReport.module';
import { AppService } from './app.service';

@Module({
  imports: [ImageReportModule],
  controllers: [AppController, UserController, ImageReportController],
  providers: [AppService],
})
export class AppModule {}
