import { DatabaseModule } from '../database/database.module.js';
import { JobsController } from './job.controller.js';
import { JobsService } from './job.service.js';
import { Module } from '@nestjs/common';

@Module({
    imports: [DatabaseModule],
    controllers: [JobsController],
    providers: [JobsService],
})
export class JobsModule {}
