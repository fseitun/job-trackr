import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service.js';
import { userPreferences } from '../database/schema.js';
import { UpdateUserPreferenceDto } from './dto/user-preferences.dto.js';

@Injectable()
export class UserPreferencesService {
    constructor(private dbService: DatabaseService) {}

    async getPreferences(userId: string) {
        const [preference] = await this.dbService.db
            .select()
            .from(userPreferences)
            .where(eq(userPreferences.userId, userId))
            .limit(1);

        if (!preference) {
            return {};
        }
        return preference;
    }

    async updatePreferences(
        userId: string,
        updateDto: UpdateUserPreferenceDto,
    ): Promise<void> {
        const existing = await this.dbService.db
            .select()
            .from(userPreferences)
            .where(eq(userPreferences.userId, userId))
            .limit(1);

        if (existing.length === 0) {
            await this.dbService.db.insert(userPreferences).values({
                userId,
                preferences: updateDto.preferences,
            });
        } else {
            await this.dbService.db
                .update(userPreferences)
                .set({
                    preferences: updateDto.preferences,
                })
                .where(eq(userPreferences.userId, userId));
        }
    }
}
