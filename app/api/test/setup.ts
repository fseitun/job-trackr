import { afterAll, beforeAll } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
import { INestApplication } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service.js';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load test environment variables
config({ path: resolve(__dirname, '.env.test') });

let app: INestApplication;
let dbService: DatabaseService;

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    dbService = moduleRef.get<DatabaseService>(DatabaseService);
    const configService = app.get(ConfigService);

    // Set up test-specific configurations
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: configService.get<string>('CORS_ORIGIN'),
        credentials: true,
    });

    await app.init();
});

afterAll(async () => {
    if (dbService) {
        await dbService.pool.end();
    }
    if (app) {
        await app.close();
    }
});

// Export app instance for use in tests
export { app, dbService };
