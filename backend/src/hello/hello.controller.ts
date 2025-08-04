import { Controller, Get } from '@nestjs/common';

@Controller('api/hello')
export class HelloController {
    @Get()
    getHello() {
        return { message: 'Hello World from BackEnd' };
    }
}
