import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { DatabaseModule } from '../database/database.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
