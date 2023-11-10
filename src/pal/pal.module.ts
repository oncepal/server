import { Module } from '@nestjs/common';
import { PalService } from './pal.service';
import { UserModule } from '../user/user.module';

import { PalController } from './pal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pal, PalSchema } from './pal.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Pal.name, schema: PalSchema }])],
  
  providers: [PalService],
  controllers: [PalController],
  exports: [PalService],
})
export class PalModule {}