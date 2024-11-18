import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Request, type Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);

    use(req: Request, _res: Response, next: NextFunction) {
        this.logger.log(`Request... ${req.method} ${req.originalUrl}`);
        next();
    }
}
