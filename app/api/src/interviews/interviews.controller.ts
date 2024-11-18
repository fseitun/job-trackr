import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto.js';
import { CustomRequest } from '../types/custom-request.interface.js';
import { InterviewsService } from './interviews.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UpdateInterviewDto } from './dto/update-interview.dto.js';

@Controller('interviews')
@UseGuards(JwtAuthGuard)
export class InterviewsController {
    constructor(private readonly interviewsService: InterviewsService) {}
    private readonly logger = new Logger(InterviewsController.name);

    @Post()
    async create(
        @Body() createInterviewDto: CreateInterviewDto,
        @Req() req: CustomRequest,
    ) {
        const userId = req.user.userId;
        this.logger.log(`Creating interview`);
        return await this.interviewsService.create(createInterviewDto, userId);
    }

    @Get()
    async findAll(@Req() req: CustomRequest) {
        const userId = req.user.userId;
        this.logger.log(`Finding all interviews for user ${userId}`);
        return await this.interviewsService.findAll(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        this.logger.log(`Finding interview with id ${id}`);
        return await this.interviewsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateInterviewDto: UpdateInterviewDto,
    ) {
        this.logger.log(`Updating interview with id ${id}`);
        return await this.interviewsService.update(id, updateInterviewDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.logger.log(`Removing interview with id ${id}`);
        return await this.interviewsService.remove(id);
    }
}
