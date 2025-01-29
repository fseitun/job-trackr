import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { DatabaseService } from '../database/database.service.js';
import { ConflictException, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema.js';
import bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
    default: {
        hash: vi.fn().mockResolvedValue('hashedPassword'),
    },
}));

vi.mock('drizzle-orm', () => ({
    eq: vi.fn(),
}));

vi.mock('../database/schema.js', () => ({
    users: {},
}));

const mockDb = {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn(),
};

const mockDatabaseService = {
    db: mockDb,
};

describe('UsersService', () => {
    let service: UsersService;
    let dbService: DatabaseService;

    const mockUser = {
        id: '123',
        email: 'test@example.com',
        passwordHash: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockLogger = {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        const module = await Test.createTestingModule({
            providers: [
                UsersService,
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

        service = module.get<UsersService>(UsersService);
        dbService = module.get<DatabaseService>(DatabaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const createUserDto = {
            email: 'test@example.com',
            password: 'password123',
        };

        it('should create a new user', async () => {
            mockDb.where.mockResolvedValueOnce([]);
            mockDb.returning.mockResolvedValueOnce([mockUser]);

            const result = await service.create(createUserDto);

            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
            });
            expect(bcrypt.hash).toHaveBeenCalledWith(
                createUserDto.password,
                10,
            );
            expect(mockDb.insert).toHaveBeenCalledWith(users);
            expect(mockDb.values).toHaveBeenCalledWith({
                email: createUserDto.email,
                passwordHash: 'hashedPassword',
            });
        });

        it('should throw ConflictException if email exists', async () => {
            mockDb.where.mockResolvedValueOnce([mockUser]);

            await expect(service.create(createUserDto)).rejects.toThrow(
                ConflictException,
            );
            expect(mockDb.insert).not.toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.create(createUserDto)).rejects.toThrow(
                'Database error',
            );
        });
    });

    describe('findByEmail', () => {
        it('should return user if found', async () => {
            mockDb.where.mockResolvedValueOnce([mockUser]);

            const result = await service.findByEmail('test@example.com');

            expect(result).toEqual(mockUser);
            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalledWith(users);
            expect(eq).toHaveBeenCalledWith(users.email, 'test@example.com');
        });

        it('should return null if user not found', async () => {
            mockDb.where.mockResolvedValueOnce([]);

            const result = await service.findByEmail('nonexistent@example.com');

            expect(result).toBeNull();
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(
                service.findByEmail('test@example.com'),
            ).rejects.toThrow('Database error');
        });
    });

    describe('findById', () => {
        it('should return user if found', async () => {
            mockDb.where.mockResolvedValueOnce([mockUser]);

            const result = await service.findById('123');

            expect(result).toEqual(mockUser);
            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalledWith(users);
            expect(eq).toHaveBeenCalledWith(users.id, '123');
        });

        it('should return null if user not found', async () => {
            mockDb.where.mockResolvedValueOnce([]);

            const result = await service.findById('456');

            expect(result).toBeNull();
        });

        it('should handle database errors', async () => {
            mockDb.where.mockRejectedValueOnce(new Error('Database error'));

            await expect(service.findById('123')).rejects.toThrow(
                'Database error',
            );
        });
    });
});
