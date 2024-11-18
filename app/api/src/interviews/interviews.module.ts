import { DatabaseModule } from '../database/database.module.js';
import { InterviewsController } from './interviews.controller.js';
import { InterviewsService } from './interviews.service.js';
import { Module } from '@nestjs/common';
@Module({
    imports: [DatabaseModule],
    controllers: [InterviewsController],
    providers: [InterviewsService],
})
export class InterviewsModule {}
