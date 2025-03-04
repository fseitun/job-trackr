import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
    private readonly debug = true;

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        const now = Date.now();
        return next.handle().pipe(
            tap((data) => {
                if (this.debug) {
                    this.logger.log(
                        `Response: ${method} ${url} ${
                            this.debug ? JSON.stringify(data, null, 2) : ''
                        } - ${Date.now() - now}ms`,
                    );
                }
            }),
            catchError((err: HttpException) => {
                this.logger.error(
                    `Error Response: ${method} ${url} ${err.getStatus()} - ${
                        Date.now() - now
                    }ms`,
                    err.stack,
                );
                throw err;
            }),
        );
    }
}
