import * as bcrypt from 'bcrypt';
import {
    Body,
    Controller,
    Logger,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    private readonly logger = new Logger(UsersController.name);

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        this.logger.log('Registering a new user');
        return await this.usersService.create(userData);
    }

    @Post('login')
    async login(@Body() userData: LoginUserDto) {
        const user = await this.usersService.findByEmail(userData.email);
        if (!user) {
            this.logger.error('User not found in request');
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            userData.password,
            user.passwordHash,
        );
        if (!isPasswordValid) {
            this.logger.error('Invalid credentials');
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        this.logger.log('User logged in successfully');

        return { token };
    }
}
