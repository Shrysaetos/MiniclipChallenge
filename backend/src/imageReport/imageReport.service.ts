import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UsingJoinColumnIsNotAllowedError } from 'typeorm';

import { ImageReport } from './imageReport.entity';

@Injectable()
export class ImageReportService {
  constructor(
    @InjectRepository(ImageReport)
    private imageReportsRepository: Repository<ImageReport>,
  ) {}

  async createNewReport(report: {
    image: Uint8Array;
    userId: number;
    comment: string;
  }) {
    console.log('RUnning THROUGFH SREVICE');
    const newReport = await this.imageReportsRepository.create(report);
    await this.imageReportsRepository.save(newReport);
    return newReport;
  }
}
