import {
    Controller,
    Get,
    Put,
    Body,
    Req,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service.js';
import { UpdateUserPreferenceDto } from './dto/user-preferences.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CustomRequest } from '../types/custom-request.interface.js';

@Controller('user/preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
    constructor(private readonly preferencesService: UserPreferencesService) {}

    @Get()
    async getPreferences(
        @Req() req: CustomRequest,
    ): Promise<Record<string, boolean>> {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException();
        }
        return this.preferencesService.getPreferences(userId);
    }

    @Put()
    async updatePreferences(
        @Req() req: CustomRequest,
        @Body() updateDto: UpdateUserPreferenceDto,
    ): Promise<void> {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException();
        }
        await this.preferencesService.updatePreferences(userId, updateDto);
    }
}
