import { Module } from '@nestjs/common';
import { PalService } from './pal.service';
import { PalController } from './pal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Need, NeedSchema } from './schemas/need.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Need.name, schema: NeedSchema }])],
  providers: [PalService],
  controllers: [PalController],
  exports: [PalService],
})
export class PalModule {}