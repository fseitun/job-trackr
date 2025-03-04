import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserPayload } from '../types/user.interface.js';
import { UsersService } from '../users/users.service.js';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
    sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<UserPayload | null> {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            return null;
        }
        return { userId: user.id, email: user.email };
    }
}
