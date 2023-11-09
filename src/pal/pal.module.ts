import { Module } from '@nestjs/common';
import { PalService } from './pal.service';
import { UserModule } from '../user/user.module';

import { PalController } from './pal.controller';

@Module({
  imports: [
    UserModule,
   
  ],
  providers: [PalService],
  controllers: [PalController],
  exports: [PalService],
})
export class PalModule {}