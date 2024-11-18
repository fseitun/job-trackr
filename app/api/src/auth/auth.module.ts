import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.js';
import { jwtConfig } from '../../config.js';

@Global()
@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.register(jwtConfig),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule, AuthService],
})
export class AuthModule {}
