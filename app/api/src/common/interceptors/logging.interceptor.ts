import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable, tap, catchError } from "rxjs";
import { HttpException } from "@nestjs/common";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    this.logger.log(`Incoming Request: ${method} ${url} ${JSON.stringify(body)}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((data) =>
        this.logger.log(
          `Response: ${method} ${url} ${JSON.stringify(data)} - ${
            Date.now() - now
          }ms`
        )
      ),
      catchError((err: HttpException) => {
        this.logger.error(
          `Error Response: ${method} ${url} ${err.getStatus()} - ${
            Date.now() - now
          }ms`,
          err.stack
        );
        throw err;
      })
    );
  }
}
