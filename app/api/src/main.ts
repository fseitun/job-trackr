import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            enableDebugMessages: true,
            exceptionFactory: (errors) => {
                const detailedErrors = errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                }));
                return new BadRequestException(detailedErrors);
            },
        }),
    );

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.setGlobalPrefix('api');

    await app.listen(3000);
}
bootstrap();
