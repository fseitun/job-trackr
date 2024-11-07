import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { JobsService } from "./job.service.js";
import { CreateJobsDto } from "./dto/create-job.dto.js";
import { UpdateJobDto } from "./dto/update-job.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { CustomRequest } from "../types/custom-request.interface.js";

@Controller("job")
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  private readonly logger = new Logger(JobsController.name);

  @Post()
  async create(@Body() createJobDto: CreateJobsDto, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    this.logger.log(`Creating jobs for user ${userId}`);
    return await this.jobsService.create(createJobDto, userId);
  }

  @Get()
  async findAll(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    this.logger.log(`Finding all jobs for user ${userId}`);
    return await this.jobsService.findAll(userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    const job = await this.jobsService.findOne(id, userId);
    if (!job) {
      throw new NotFoundException(`job with id ${id} not found`);
    }
    return job;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.userId;
    this.logger.log(`Updating job with id ${id} for user ${userId}`);
    return await this.jobsService.update(id, updateJobDto, userId);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req: CustomRequest) {
    if (!req.user) {
      this.logger.error("User not found in request");
      throw new NotFoundException("User not found in request");
    }
    const userId = req.user.userId;
    this.logger.log(`Removing job with id ${id} for user ${userId}`);
    return await this.jobsService.remove(id, userId);
  }
}
