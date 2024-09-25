import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor<T = unknown> implements NestInterceptor<T, T> {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const now = Date.now();

    this.logger.log(`Incoming Request: ${method} ${url}`);
    this.logger.debug(`Request Body: ${JSON.stringify(request.body, null, 2)}`);

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        this.logger.log(
          `Outgoing Response: ${method} ${url} ${statusCode} - ${Date.now() - now}ms`
        );
      }),
      catchError((error) => {
        const { statusCode } = response;
        this.logger.error(
          `Error Response: ${method} ${url} ${statusCode} - ${Date.now() - now}ms`,
          error.stack
        );
        return throwError(() => error);
      })
    );
  }
}
