import {  Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = new Redis();
        await client.connect();
        return client;
      }
    }
  ]
})
export class RedisModule {}