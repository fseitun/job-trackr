import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { Logger } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let usersService: UsersService;
    let logger: Logger;

    const mockUser = {
        id: '123',
        email: 'test@example.com',
        passwordHash: '$2b$10$test',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockJwtService = {
        sign: vi.fn().mockReturnValue('mock.jwt.token'),
        verifyAsync: vi.fn(),
    };

    const mockUsersService = {
        findById: vi.fn(),
        findByEmail: vi.fn(),
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
                AuthService,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: Logger,
                    useValue: mockLogger,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        usersService = module.get<UsersService>(UsersService);
        logger = module.get<Logger>(Logger);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateToken', () => {
        it('should return true for a valid token', async () => {
            const token = 'valid.jwt.token';
            mockJwtService.verifyAsync.mockResolvedValueOnce({ sub: '123' });

            const result = await service.validateToken(token);

            expect(result).toBe(true);
            expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
        });

        it('should return false for an invalid token', async () => {
            const token = 'invalid.jwt.token';
            mockJwtService.verifyAsync.mockRejectedValueOnce(
                new Error('Invalid token'),
            );

            const result = await service.validateToken(token);

            expect(result).toBe(false);
            expect(mockLogger.error).toHaveBeenCalledWith(
                'Token validation failed: Invalid token',
            );
        });

        it('should handle unknown errors', async () => {
            const token = 'error.jwt.token';
            mockJwtService.verifyAsync.mockRejectedValueOnce('Unknown error');

            const result = await service.validateToken(token);

            expect(result).toBe(false);
            expect(mockLogger.error).toHaveBeenCalledWith(
                'Token validation failed: Unknown error',
            );
        });
    });

    describe('validateUser', () => {
        it('should return user payload for valid user ID', async () => {
            const userId = mockUser.id;
            mockUsersService.findById.mockResolvedValueOnce(mockUser);

            const result = await service.validateUser(userId);

            expect(result).toEqual({
                userId: mockUser.id,
                email: mockUser.email,
            });
            expect(usersService.findById).toHaveBeenCalledWith(userId);
        });

        it('should return null for invalid user ID', async () => {
            mockUsersService.findById.mockResolvedValueOnce(null);

            const result = await service.validateUser('invalid-id');

            expect(result).toBeNull();
            expect(mockLogger.warn).toHaveBeenCalledWith(
                'User not found with ID: invalid-id',
            );
        });

        it('should handle database errors', async () => {
            mockUsersService.findById.mockRejectedValueOnce(
                new Error('Database error'),
            );

            const result = await service.validateUser('123');

            expect(result).toBeNull();
            expect(mockLogger.error).toHaveBeenCalledWith(
                'User validation failed: Database error',
            );
        });
    });
});
