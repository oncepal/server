import { Statistic } from './statistic.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FindStatisticDto } from './statistic.dto';
@Injectable()
export class StatisticService {
    constructor(@InjectModel(Statistic.name) private model: Model<Statistic>) { }

    find(filter?: FindStatisticDto) {
        return this.model.find(filter);
    }
   
   
}