import { Module } from '@nestjs/common';
import { ImageReportService } from './imageReport.service';

@Module({
  providers: [ImageReportService],
  exports: [ImageReportService],
})
export class ImageReportModule {}
