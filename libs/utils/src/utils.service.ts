import { Injectable } from '@nestjs/common';
import { Response } from "express";
import { BadRequestException, ParseIntPipe } from "@nestjs/common";
@Injectable()
export class UtilsService {

    static generateParseIntPipe(key:string) {
        return new ParseIntPipe({
          exceptionFactory() {
            throw new BadRequestException(key + ' 应该为数字！');
          } 
        })
     }
     static error(res:Response,code:number,message:string){
        return res.status(code).json({ message: message }) 
     }

     static generateSkip(page:number,pageSize:number){
        return (page-1)*pageSize
     }
     
}


