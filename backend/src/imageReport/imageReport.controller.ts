import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ImageReport } from './imageReport.entity';
import { ImageReportService } from './imageReport.service';

@Controller('/api/report')
export class ImageReportController {
  constructor(private readonly imageReportService: ImageReportService) {}

  @Post()
  async createReport(
    @Res() response,
    @Req() request,
    @Body() report: ImageReport,
  ) {
    const requestBody = {
      userId: report.userId,
      image: report.image,
    };
    const newReport = await this.imageReportService.createNewReport(
      requestBody,
    );
    return response.status(HttpStatus.CREATED).json({
      newReport,
    });
  }
}
