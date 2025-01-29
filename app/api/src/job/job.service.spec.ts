import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { JobsService } from './job.service.js';
import { DatabaseService } from '../database/database.service.js';
import { NotFoundException, Logger } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { jobs } from '../database/schema.js';

vi.mock('drizzle-orm', () => ({
    and: vi.fn(),
    eq: vi.fn(),
    sql: vi.fn(),
}));

vi.mock('../database/schema.js', () => ({
    jobs: {},
}));

const mockJob = {
    id: 'job123',
    hiringCompany: 'Test Company',
    recruitingCompany: 'Test Recruiter',
    position: 'Software Engineer',
    recruiterName: 'John Doe',
    recruitmentChannel: 'LinkedIn',
    monthlySalary: 5000,
    vacationDays: 20,
    holidayDays: 10,
    jobDescription: 'Test job description',
    directHire: true,
    timeZone: 'UTC',
    userId: 'user123',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockDb = {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    groupBy: vi.fn().mockReturnThis(),
};

const mockDatabaseService = {
    db: mockDb,
};

const mockLogger = {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
};

describe('JobsService', () => {
    let service: JobsService;
    let dbService: DatabaseService;

    beforeEach(async () => {
        vi.clearAllMocks();

        const module = await Test.createTestingModule({
            providers: [
                JobsService,
                {
                    provide: DatabaseService,
                    useValue: mockDatabaseService,
                },
                {
                    provide: Logger,
                    useValue: mockLogger,
                },
            ],
        }).compile();

        service = module.get<JobsService>(JobsService);
        dbService = module.get<DatabaseService>(DatabaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const createJobDto = {
            hiringCompany: 'Test Company',
            recruitingCompany: 'Test Recruiter',
            position: 'Software Engineer',
            recruiterName: 'John Doe',
            recruitmentChannel: 'LinkedIn',
            monthlySalary: 5000,
            vacationDays: 20,
            holidayDays: 10,
            jobDescription: 'Test job description',
            directHire: true,
            timeZone: 'UTC',
        };

        it('should create a new job', async () => {
            mockDb.returning.mockResolvedValueOnce([mockJob]);

            const result = await service.create(createJobDto, 'user123');

            expect(result).toEqual(mockJob);
            expect(mockDb.insert).toHaveBeenCalledWith(jobs);
            expect(mockDb.values).toHaveBeenCalledWith({
                ...createJobDto,
                userId: 'user123',
            });
        });

        it('should handle database errors', async () => {
            mockDb.returning.mockRejectedValueOnce(new Error('Database error'));

            await expect(
                service.create(createJobDto, 'user123'),
            ).rejects.toThrow('Database error');
        });
    });

    describe('findAll', () => {
        it('should return all jobs for a user', async () => {
            mockDb.groupBy.mockResolvedValueOnce([mockJob]);

            const result = await service.findAll('user123');

            expect(result).toEqual([mockJob]);
            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalledWith(jobs);
            expect(eq).toHaveBeenCalledWith(jobs.userId, 'user123');
        });

        it('should return empty array if no jobs found', async () => {
            mockDb.groupBy.mockResolvedValueOnce([]);

            const result = await service.findAll('user123');

            expect(result).toEqual([]);
        });

        it('should handle database errors', async () => {
            mockDb.groupBy.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.findAll('user123')).rejects.toThrow(
                'Database error',
            );
        });
    });

    describe('findOne', () => {
        it('should return a job if found', async () => {
            mockDb.where.mockResolvedValueOnce([mockJob]);
            mockDb.where.mockResolvedValueOnce([]);

            const result = await service.findOne('job123', 'user123');

            expect(result).toEqual({ ...mockJob, interviews: [] });
            expect(and).toHaveBeenCalled();
            expect(eq).toHaveBeenCalledWith(jobs.id, 'job123');
            expect(eq).toHaveBeenCalledWith(jobs.userId, 'user123');
        });

        it('should throw NotFoundException if job not found', async () => {
            mockDb.where.mockResolvedValueOnce([]);

            await expect(
                service.findOne('nonexistent', 'user123'),
            ).rejects.toThrow(NotFoundException);
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.findOne('job123', 'user123')).rejects.toThrow(
                'Database error',
            );
        });
    });

    describe('update', () => {
        const updateJobDto = {
            hiringCompany: 'Updated Company',
            position: 'Senior Software Engineer',
        };

        it('should update a job', async () => {
            mockDb.where.mockResolvedValueOnce([mockJob]);
            mockDb.returning.mockResolvedValueOnce([
                { ...mockJob, ...updateJobDto },
            ]);

            const result = await service.update(
                'job123',
                updateJobDto,
                'user123',
            );

            expect(result).toEqual({ ...mockJob, ...updateJobDto });
            expect(mockDb.update).toHaveBeenCalledWith(jobs);
            expect(mockDb.set).toHaveBeenCalledWith({
                ...updateJobDto,
                updatedAt: expect.any(Date),
            });
        });

        it('should throw NotFoundException if job not found', async () => {
            mockDb.where.mockResolvedValueOnce([]);

            await expect(
                service.update('nonexistent', updateJobDto, 'user123'),
            ).rejects.toThrow(NotFoundException);
            expect(mockDb.update).not.toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(
                service.update('job123', updateJobDto, 'user123'),
            ).rejects.toThrow('Database error');
        });
    });

    describe('remove', () => {
        it('should remove a job', async () => {
            mockDb.where.mockResolvedValueOnce([mockJob]);

            const result = await service.remove('job123', 'user123');

            expect(result).toEqual({ deleted: true });
            expect(mockDb.delete).toHaveBeenCalledWith(jobs);
            expect(and).toHaveBeenCalled();
            expect(eq).toHaveBeenCalledWith(jobs.id, 'job123');
            expect(eq).toHaveBeenCalledWith(jobs.userId, 'user123');
        });

        it('should throw NotFoundException if job not found', async () => {
            mockDb.where.mockResolvedValueOnce([]);

            await expect(
                service.remove('nonexistent', 'user123'),
            ).rejects.toThrow(NotFoundException);
            expect(mockDb.delete).not.toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.remove('job123', 'user123')).rejects.toThrow(
                'Database error',
            );
        });
    });
});
