import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { type Request, type Response, type NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request... ${req.method} ${req.originalUrl}`);
    next();
  }
}
