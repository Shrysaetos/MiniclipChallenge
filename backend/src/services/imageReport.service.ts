import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ImageReport } from '../entities/ImageReport';

@Injectable()
export class ImageReportService {
  constructor(
    @InjectRepository(ImageReport)
    private imageReportsRepository: Repository<ImageReport>,
  ) {}

  async createNewReport(report: { image: Uint8Array; userId: number }) {
    const newReport = await this.imageReportsRepository.create(report);
    await this.imageReportsRepository.save(newReport);
    return newReport;
  }
}
