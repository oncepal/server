import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];

    const { ip, method, path } = request;

    // this.logger.fatal(
    //   `接口 ${method} ${path} 被 ${ip} ${userAgent}: 调用了，这个接口在 ${
    //     context.getClass().name
    //   } 的 ${
    //     context.getHandler().name
    //   } 方法`,
    // ); 
  
    const now = Date.now();
 
    return next.handle().pipe(
      tap((res) => {
        // this.logger.debug(
        //   `响应状态 ${response.statusCode} 共计: ${Date.now() - now}ms`,
        // );
        // this.logger.debug(`返回值: ${JSON.stringify(res)}`);
      }),
    );
  }
}

