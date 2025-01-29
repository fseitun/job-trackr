import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { UserPayload } from '../types/user.interface.js';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateToken(token: string): Promise<boolean> {
        try {
            const result = await this.jwtService.verifyAsync(token);
            return !!result;
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Token validation failed: ${message}`);
            return false;
        }
    }

    async validateUser(userId: string): Promise<UserPayload | null> {
        try {
            const user = await this.usersService.findById(userId);
            if (!user) {
                this.logger.warn(`User not found with ID: ${userId}`);
                return null;
            }
            return { userId: user.id, email: user.email };
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`User validation failed: ${message}`);
            return null;
        }
    }
}
