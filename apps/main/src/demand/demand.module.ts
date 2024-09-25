import { Module } from '@nestjs/common';
import { DemandService } from './demand.service';
import { DemandController } from './demand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Demand, DemandSchema } from '@libs/schemas';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,MongooseModule.forFeature([{name: Demand.name, schema: DemandSchema }])],
  providers: [DemandService],
  controllers: [DemandController],
  exports: [DemandService],
})
export class DemandModule {}