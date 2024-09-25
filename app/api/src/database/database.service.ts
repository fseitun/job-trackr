import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public pool!: Pool;
  public db!: NodePgDatabase;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      user: this.configService.get<string>("DATABASE_USER"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
    });

    this.db = drizzle(this.pool);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
