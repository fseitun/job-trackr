import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { InterviewsModule } from './interviews/interviews.module.js';
import { JobsModule } from './job/job.module.js';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        JwtModule.register({
            secret: 'your-secret-key',
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
