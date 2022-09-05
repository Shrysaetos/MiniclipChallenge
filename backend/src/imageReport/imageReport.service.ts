import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import * as nsfwjs from 'nsfwjs';
import * as tf from '@tensorflow/tfjs-node';
import { Repository } from 'typeorm';

import AppDataSource from '../database/data-source';
import {
  ImageReport,
  STATUS_PENDING,
  STATUS_REJECTED,
} from './imageReport.entity';

@Injectable()
export class ImageReportService {
  constructor(
    @InjectRepository(ImageReport)
    private imageReportsRepository: Repository<ImageReport>,
  ) {}

  //TODO: Add support to receive URL instead of image and download image from received URL
  async createNewReport(report: {
    image: string;
    userId: number;
    comment: string;
    callback: string;
    status: number;
  }) {
    const newReport = await this.imageReportsRepository.create(report);
    this.evaluateImage(newReport);
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
    try {
      const promisses = reports.map(async (report) => {
        await this.imageReportsRepository.update(
          { id: report.id },
          { status: report.status },
        );

        const reportToUpdate = await this.imageReportsRepository.findOneBy({
          id: report.id,
        });

        if (!reportToUpdate) {
          return false;
        }

        if (reportToUpdate.status !== STATUS_PENDING) {
          await axios.post(reportToUpdate.callback, {
            userId: reportToUpdate.userId,
            result:
              reportToUpdate.status === STATUS_REJECTED
                ? 'rejected'
                : 'approved',
          });
        }
      });

      await Promise.all(promisses);
    } catch (error) {
      return false;
    }

    return true;
  }

  async evaluateImage(report: ImageReport) {
    const model = await nsfwjs.load();
    const decodedImage = tf.node.decodeImage(
      Buffer.from(report.image, 'base64'),
      3,
    );
    const predictions = await model.classify(decodedImage);
    const evaluation = predictions.reduce((finalEval, category) => {
      if (['Neutral', 'Drawing'].includes(category.className)) {
        return finalEval;
      } else if (category.className === 'Sexy') {
        return finalEval + category.probability / 2;
      } else {
        return finalEval + category.probability;
      }
    }, 0);

    this.imageReportsRepository.update(
      { id: report.id },
      { evaluation: parseFloat(evaluation.toFixed(2)) },
    );
  }
}
