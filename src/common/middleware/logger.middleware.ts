import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
/**
 * 所有请求触发之前走的公共日志输出方法
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`接口${req.baseUrl}收到${req.method}请求`);
    console.log('参数：')
    switch (req.method) {
      case 'GET':
        if (Object.keys(req.query).length > 0)
          console.log(req.query);
        break;
      case 'POST':
      case 'PUT':
        console.log(req.body);
        break;

      default: console.log(req.params)
        break;
    }

    next();

  }
}
