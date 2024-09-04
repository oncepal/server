import {  Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
@Module({
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
  ],
  exports: [RedisService],
})
export class RedisModule {}
