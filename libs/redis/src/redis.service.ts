import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {

    @Inject('REDIS_CLIENT') 
    private redisClient: Redis;

    async get(key: string) {
        return await this.redisClient.get(key);
    }

    async set(key: string, value: string | number, ttl?: number) {
        await this.redisClient.set(key, value);

        if(ttl) {
            await this.redisClient.expire(key, ttl);
        }
    }
}