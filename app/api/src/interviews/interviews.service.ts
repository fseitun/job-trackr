import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateInterviewDto } from './dto/create-interview.dto.js';
import { UpdateInterviewDto } from './dto/update-interview.dto.js';
import { interviews, jobs } from '../database/schema.js';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class InterviewsService {
    private readonly logger = new Logger(InterviewsService.name);

    constructor(private dbService: DatabaseService) {}

    async create(createInterviewDto: CreateInterviewDto, userId: string) {
        this.logger.log(
            `Creating interview with data: ${JSON.stringify(createInterviewDto)}`,
        );

        this.logger.debug(JSON.stringify(createInterviewDto, null, 2));

        const job = await this.dbService.db
            .select()
            .from(jobs)
            .where(
                and(
                    eq(jobs.id, createInterviewDto.jobId),
                    eq(jobs.userId, userId),
                ),
            );

        if (job.length === 0) {
            throw new NotFoundException('Job not found or not owned by user');
        }

        const [newInterview] = await this.dbService.db
            .insert(interviews)
            .values({
                ...createInterviewDto,
                interviewDate: new Date(createInterviewDto.interviewDate),
            })
            .returning();

        return newInterview;
    }

    async findAll(userId: string) {
        this.logger.log('Fetching all interviews for current user');

        return await this.dbService.db
            .select()
            .from(interviews)
            .leftJoin(jobs, eq(interviews.jobId, jobs.id))
            .where(eq(jobs.userId, userId));
    }

    async findOne(id: string) {
        this.logger.log(`Fetching interview with id: ${id}`);

        const [interview] = await this.dbService.db
            .select()
            .from(interviews)
            .where(eq(interviews.id, id));

        if (!interview) {
            throw new NotFoundException(`Interview with id ${id} not found`);
        }

        return interview;
    }

    async update(id: string, updateInterviewDto: UpdateInterviewDto) {
        this.logger.log(`Updating interview with id: ${id}`);

        if (updateInterviewDto.interviewDate) {
            if (isNaN(new Date(updateInterviewDto.interviewDate).getTime())) {
                this.logger.error('Invalid interviewDate format.');
                throw new BadRequestException('Invalid interviewDate format.');
            }
            const existingInterview = await this.dbService.db
                .select()
                .from(interviews)
                .where(eq(interviews.id, id));

            if (existingInterview.length === 0) {
                throw new NotFoundException(
                    `Interview with id ${id} not found`,
                );
            }

            const [updatedInterview] = await this.dbService.db
                .update(interviews)
                .set({
                    ...updateInterviewDto,
                    updatedAt: new Date(),
                    interviewDate: new Date(updateInterviewDto.interviewDate),
                })
                .where(eq(interviews.id, id))
                .returning();

            return updatedInterview;
        }
    }

    async remove(id: string) {
        this.logger.log(`Deleting interview with id: ${id}`);

        const existingInterview = await this.dbService.db
            .select()
            .from(interviews)
            .where(eq(interviews.id, id));

        if (existingInterview.length === 0) {
            throw new NotFoundException(`Interview with id ${id} not found`);
        }

        await this.dbService.db.delete(interviews).where(eq(interviews.id, id));
        return { deleted: true };
    }
}
