import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import pg, { type Pool as PoolType } from 'pg';
import { ConfigService } from '@nestjs/config';

const { Pool } = pg;
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    public pool!: PoolType;
    public db!: NodePgDatabase;

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        this.pool = new Pool({
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            user: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
        });

        this.db = drizzle(this.pool);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
