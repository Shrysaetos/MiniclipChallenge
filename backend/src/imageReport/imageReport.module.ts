import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageReportService } from './imageReport.service';
import { ImageReport } from './imageReport.entity';
import { ImageReportController } from './imageReport.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageReport, User])],
  controllers: [ImageReportController],
  providers: [ImageReportService],
})
export class ImageReportModule {}
