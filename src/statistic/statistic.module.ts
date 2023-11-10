import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';

import { StatisticController } from './statistic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './statistic.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Statistic.name, schema: StatisticSchema }])],
  providers: [StatisticService],
  controllers: [StatisticController],
  exports: [StatisticService],
})
export class StatisticModule {}