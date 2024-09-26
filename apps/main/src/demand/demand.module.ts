import { Module } from '@nestjs/common';
import { DemandService } from './demand.service';
import { DemandController } from './demand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Demand, DemandSchema } from '@libs/schemas';
import { UserModule } from '../user/user.module';

@Module({
  // 使用 Mongoose
  // imports: [MongooseModule.forFeature([{name: Demand.name, schema: DemandSchema }])],
  imports: [UserModule],  
  providers: [DemandService],
  controllers: [DemandController],
  exports: [DemandService],
})
export class DemandModule {}