import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  @Public()
  @Post('createUser')
  createUser(@Body() user:Prisma.UserCreateInput) {
    return this.userClient.send('createUser', user);
  }


  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
