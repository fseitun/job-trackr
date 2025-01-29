import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn:
                        configService.get<string>('JWT_EXPIRES_IN') + 's',
                },
            }),
            inject: [ConfigService],
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
