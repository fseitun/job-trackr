import { Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { Response } from 'express';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    @Get('validate-token')
    validateToken() {
        this.logger.log('Token validated successfully');
        return { message: 'Token is valid' };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        this.logger.log('Logging out user');
        response.clearCookie('access_token');
        return { message: 'Logged out successfully' };
    }
}
