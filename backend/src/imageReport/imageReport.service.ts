import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ImageReport, STATUS_PENDING } from './imageReport.entity';

@Injectable()
export class ImageReportService {
  constructor(
    @InjectRepository(ImageReport)
    private imageReportsRepository: Repository<ImageReport>,
  ) {}

  async createNewReport(report: {
    image: string;
    userId: number;
    comment: string;
  }) {
    const newReport = await this.imageReportsRepository.create(report);
    await this.imageReportsRepository.save(newReport);
    return newReport;
  }

  async findAll() {
    const reportsArray = await this.imageReportsRepository.find();
    return reportsArray;
  }

  async findPending() {
    const reportsArray = await this.imageReportsRepository.find({
      where: {
        status: STATUS_PENDING,
      },
      order: {
        evaluation: 'DESC',
      },
    });
    return reportsArray;
  }

  async updateReports(reports) {
    const updatedReports = [];
    try {
      reports.map(async (report) => {
        const auxReport = await this.imageReportsRepository.update(
          { id: report.id },
          { status: report.status },
        );
        updatedReports.push(auxReport);
      });

      await this.imageReportsRepository.save(updatedReports);
    } catch (error) {
      return false;
    }

    return true;
  }
}
