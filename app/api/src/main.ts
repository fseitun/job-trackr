import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { BadRequestException } from '@nestjs/common';

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
