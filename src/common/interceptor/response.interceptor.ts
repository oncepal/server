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
      const response = context.switchToHttp().getResponse<Response>();
      console.log(response);
      return next.handle().pipe(
        map(data => {
          return {
            data,
            code:  response.statusCode,
            message: '请求成功',
          };
        }),
      );
    }
  }