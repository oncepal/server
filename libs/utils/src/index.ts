import { Response } from 'express';
import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export function generateParseIntPipe(key: string) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(key + ' 应该为数字！');
    },
  });
}
export function error(res: Response, code: number, message: string) {
  
  return res.status(code).json({ message: message });
}

export function generateSkip(page: number, pageSize: number) {
  return (page - 1) * pageSize;
}
