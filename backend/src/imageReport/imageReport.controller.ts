import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { ImageReportService } from './imageReport.service';

@Controller('/api/report')
export class ImageReportController {
  constructor(private readonly imageReportService: ImageReportService) {}

  @Post()
  async createReport(@Res() response, @Req() request, @Body() report) {
    const requestBody = {
      userId: report.userId,
      image: report.image,
      comment: report.comment,
    };

    if (!report.userId || !report.image) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Missing required parameters' });
    }

    const newReport = await this.imageReportService.createNewReport(
      requestBody,
    );
    return response.status(HttpStatus.CREATED).json({ newReport });
  }
}
