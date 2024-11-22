import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { interviews, jobs } from '../database/schema.js';
import { CreateJobsDto } from './dto/create-job.dto.js';
import { DatabaseService } from '../database/database.service.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { UserPreferencesService } from '../users/user-preferences.service.js';

@Injectable()
export class JobsService {
    private readonly logger = new Logger(JobsService.name);

    constructor(
        private dbService: DatabaseService,
        private userPreferencesService: UserPreferencesService,
    ) {}

    async create(createJobsDto: CreateJobsDto, userId: string) {
        this.logger.log(
            `Creating job with data: ${JSON.stringify(createJobsDto)}`,
        );

        const jobData = {
            hiringCompany: createJobsDto.hiringCompany,
            recruitingCompany: createJobsDto.recruitingCompany,
            position: createJobsDto.position,
            recruiterName: createJobsDto.recruiterName,
            recruitmentChannel: createJobsDto.recruitmentChannel,
            monthlySalary: createJobsDto.monthlySalary ?? 0,
            vacationDays: createJobsDto.vacationDays ?? 0,
            holidayDays: createJobsDto.holidayDays ?? 0,
            jobDescription: createJobsDto.jobDescription ?? '',
            directHire: createJobsDto.directHire ?? false,
            timeZone: createJobsDto.timeZone ?? '',
        };

        const [newJob] = await this.dbService.db
            .insert(jobs)
            .values({ ...jobData, userId })
            .returning();

        return newJob;
    }

    async update(id: string, updateJobDto: UpdateJobDto, userId: string) {
        this.logger.log(`Updating job with id: ${id}`);

        const existingJob = await this.dbService.db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

        if (existingJob.length === 0) {
            throw new NotFoundException(`job with id ${id} not found`);
        }

        const [updatedJob] = await this.dbService.db
            .update(jobs)
            .set({ ...updateJobDto, updatedAt: new Date() })
            .where(and(and(eq(jobs.id, id), eq(jobs.userId, userId))))
            .returning();

        if (!updatedJob) {
            throw new NotFoundException(`job with id ${id} not found`);
        }
        return updatedJob;
    }

    async findAll(userId: string) {
        this.logger.log('Fetching all jobs with user-selected columns');
        const preferences =
            await this.userPreferencesService.getPreferences(userId);

        const defaultColumns: Record<string, boolean> = {
            hiringCompany: true,
            recruitingCompany: true,
            position: true,
            recruiterName: true,
            recruitmentChannel: false,
            monthlySalary: true,
            vacationDays: true,
            holidayDays: true,
            jobDescription: false,
            directHire: false,
            timeZone: false,
            lastInteraction: true,
        };

        const selectedColumns = { ...defaultColumns, ...preferences };

        const selectedFields: Record<string, any> = {
            id: jobs.id,
        };

        Object.keys(selectedColumns).forEach((key) => {
            if (
                selectedColumns[key as keyof typeof selectedColumns] &&
                jobs[key as keyof typeof jobs]
            ) {
                selectedFields[key] = jobs[key as keyof typeof jobs];
            }
        });

        selectedFields['lastInteraction'] =
            sql<Date>`MAX(${interviews.interviewDate})`;

        const jobsWithLastInteraction = await this.dbService.db
            .select(selectedFields)
            .from(jobs)
            .leftJoin(interviews, eq(jobs.id, interviews.jobId))
            .where(eq(jobs.userId, userId))
            .groupBy(jobs.id);

        return jobsWithLastInteraction;
    }

    async findOne(id: string, userId: string) {
        this.logger.log(`Fetching job with id: ${id} and its interviews`);

        const [job] = await this.dbService.db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

        if (!job) {
            throw new NotFoundException(`job with id ${id} not found`);
        }

        const associatedInterviews = await this.dbService.db
            .select()
            .from(interviews)
            .where(eq(interviews.jobId, id));

        return { ...job, interviews: associatedInterviews };
    }

    async remove(id: string, userId: string) {
        this.logger.log(`Deleting job with id: ${id}`);

        const existingJob = await this.dbService.db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

        if (existingJob.length === 0) {
            throw new NotFoundException(`job with id ${id} not found`);
        }

        await this.dbService.db
            .delete(jobs)
            .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));
        return { deleted: true };
    }
}
