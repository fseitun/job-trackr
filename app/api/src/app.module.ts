import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module.js';
import { InterviewsModule } from './interviews/interviews.module.js';
import { JobsModule } from './job/job.module.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        InterviewsModule,
        JobsModule,
    ],
})
export class AppModule {}
