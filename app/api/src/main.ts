import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.get<string>('CORS_ORIGIN'),
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

    const port = configService.get<number>('API_PORT') ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
