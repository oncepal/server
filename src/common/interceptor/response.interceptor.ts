import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Response } from 'express';
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("准备返回请求");
        const response = context.switchToHttp().getResponse<Response>();
    
   
      return next.handle().pipe(
        map(data => {
          const r = {
            data,
            code:  response.statusCode,
            message: '请求成功',
          };
          console.log("返回请求:");
          console.log(r);
          return r
        }),
      );
    }
  }