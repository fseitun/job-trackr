import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsService } from './interviews.service.js';
import { DatabaseService } from '../database/database.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto.js';
import { UpdateInterviewDto } from './dto/update-interview.dto.js';
import { describe, beforeEach, it, expect, vi } from 'vitest';

// Mock class for DatabaseService
class MockDatabaseService {
    db = {
        select: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockReturnThis(),
        leftJoin: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        max: vi.fn().mockReturnThis(),
    };
}

describe('InterviewsService', () => {
    let service: InterviewsService;
    let dbService: MockDatabaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InterviewsService,
                {
                    provide: DatabaseService,
                    useClass: MockDatabaseService, // Use the mock class
                },
            ],
        }).compile();

        service = module.get<InterviewsService>(InterviewsService);
        dbService = module.get<DatabaseService>(DatabaseService) as any;

        vi.resetAllMocks(); // Reset mocks before each test
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an interview', async () => {
            const createInterviewDto: CreateInterviewDto = {
                jobId: 'job-id',
                interviewerName: 'John Doe',
                interviewerRole: 'CTO',
                interviewDate: '2024-10-21',
                notes: 'Technical interview',
            };
            const userId = 'user-id';

            // Mock the job query to return a valid job
            dbService.db.where.mockResolvedValueOnce([{ id: 'job-id' }]);

            // Mock the insert operation to return the new interview
            dbService.db.returning.mockResolvedValueOnce([
                {
                    id: 'new-interview-id',
                    ...createInterviewDto,
                    interviewDate: new Date(createInterviewDto.interviewDate),
                },
            ]);

            const result = await service.create(createInterviewDto, userId);
            expect(result).toEqual({
                id: 'new-interview-id',
                ...createInterviewDto,
                interviewDate: new Date(createInterviewDto.interviewDate),
            });
        });

        it('should throw NotFoundException if job not found', async () => {
            const createInterviewDto: CreateInterviewDto = {
                jobId: 'invalid-job-id',
                interviewerName: 'John Doe',
                interviewerRole: 'CTO',
                interviewDate: '2024-10-21',
                notes: 'Technical interview',
            };
            const userId = 'user-id';

            // Mock the job query to return no jobs
            dbService.db.where.mockResolvedValueOnce([]);

            await expect(
                service.create(createInterviewDto, userId),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('findAll', () => {
        it('should return all interviews for a user', async () => {
            const mockInterviews = [{ id: '1' }, { id: '2' }];

            // Mock the select and from methods for chaining
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce(mockInterviews);

            const result = await service.findAll('user-id');
            expect(result).toEqual(mockInterviews);
        });
    });

    describe('findOne', () => {
        it('should return an interview by id', async () => {
            const mockInterview = { id: 'interview-id' };

            // Mock the select, from, and where methods
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce([mockInterview]);

            const result = await service.findOne('interview-id');
            expect(result).toEqual(mockInterview);
        });

        it('should throw NotFoundException if interview not found', async () => {
            // Mock the select, from, and where methods to return no interviews
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce([]);

            await expect(service.findOne('non-existent-id')).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('update', () => {
        it('should update an interview', async () => {
            const updateDto: UpdateInterviewDto = {
                notes: 'Updated notes',
                interviewDate: '2024-10-21',
            };
            const updatedInterview = {
                id: 'interview-id',
                ...updateDto,
                interviewDate: new Date(updateDto.interviewDate),
                updatedAt: new Date(),
            };

            // Mock the selection to verify existence
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce([{ id: 'interview-id' }]);

            // Mock the update and returning methods
            dbService.db.update.mockReturnThis();
            dbService.db.set.mockReturnThis();
            dbService.db.where.mockReturnThis();
            dbService.db.returning.mockResolvedValueOnce([updatedInterview]);

            const result = await service.update('interview-id', updateDto);
            expect(result).toEqual(updatedInterview);
        });
    });

    describe('remove', () => {
        it('should remove an interview', async () => {
            // Mock the selection to verify existence
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce([{ id: 'interview-id' }]);

            // Mock the delete method
            dbService.db.delete.mockReturnThis();
            dbService.db.where.mockReturnThis();
            dbService.db.delete.mockResolvedValueOnce(undefined);

            const result = await service.remove('interview-id');
            expect(result).toEqual({ deleted: true });
        });

        it('should throw NotFoundException if interview not found', async () => {
            // Mock the selection to return no interviews
            dbService.db.select.mockReturnThis();
            dbService.db.from.mockReturnThis();
            dbService.db.where.mockResolvedValueOnce([]);

            await expect(service.remove('non-existent-id')).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
