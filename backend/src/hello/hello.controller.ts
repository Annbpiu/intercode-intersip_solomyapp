import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
import { HelloService } from './hello.service';

@Controller('api/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(@Res() res: express.Response) {
    res.set({
      'Cache-Control': 'no-store',
      Pragma: 'no-cache',
      Expires: '0',
    });
    return res.status(200).json(this.helloService.getHello());
  }
}
