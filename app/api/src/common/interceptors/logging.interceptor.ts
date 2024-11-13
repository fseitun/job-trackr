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
  private readonly debug = true;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        if (this.debug) {
          this.logger.log(
            `Response: ${method} ${url} ${
              this.debug ? JSON.stringify(data, null, 2) : ""
            } - ${Date.now() - now}ms`
          );
        }
      }),
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
