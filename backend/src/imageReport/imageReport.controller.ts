import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { STATUS_PENDING } from './imageReport.entity';
import { ImageReportService } from './imageReport.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/api/report')
export class ImageReportController {
  constructor(private readonly imageReportService: ImageReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createReport(
    @Res() response,
    @Req() request,
    @Body() report,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    try {
      if (!image) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Please select an image to report',
        });
      }

      if (
        !['bmp', 'jpeg', 'png', 'gif'].includes(image.mimetype.split('/')[1])
      ) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Image type not supported',
        });
      }
      const requestBody = {
        userId: report.userId,
        image: image.buffer.toString('base64'),
        comment: report.comment,
        callback: report.callback,
        status: STATUS_PENDING,
      };

      const newReport = await this.imageReportService.createNewReport(
        requestBody,
      );

      return response.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Report created succesfully',
        newReport,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Could not process image report. Please try again',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPendingReports(@Res() response, @Req() request) {
    try {
      const reportsArray = await this.imageReportService.findPending();
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Report list fetched successfully',
        data: reportsArray,
      });
    } catch (error) {
      console.log(error.message);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed fetching report list',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateReports(@Res() response, @Req() request, @Body() reports) {
    try {
      await this.imageReportService.updateReports(reports);
      return response
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Reports updated successfully' });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'Failed to update reports' });
    }
  }
}
