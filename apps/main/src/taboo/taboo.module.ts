import { Module } from '@nestjs/common';
import { TabooController } from './taboo.controller';
import {  TabooService } from './taboo.service';

@Module({
  imports: [],
  controllers: [TabooController],
  providers: [TabooService],
  exports: [TabooService],
})
export class TabooModule {}
