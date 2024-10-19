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
import { JobProcessesService } from "./job-processes.service";
import { CreateJobProcessesDto } from "./dto/create-job-processes.dto";
import { UpdateJobProcessesDto } from "./dto/update-job-processes.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CustomRequest } from "../types/custom-request.interface";

@Controller("job-processes")
@UseGuards(JwtAuthGuard)
export class JobProcessesController {
  constructor(private readonly jobProcessesService: JobProcessesService) {}

  private readonly logger = new Logger(JobProcessesController.name);

  @Post()
  async create(
    @Body() createJobProcessDto: CreateJobProcessesDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.userId;
    this.logger.log(`Creating job process for user ${userId}`);
    return await this.jobProcessesService.create(createJobProcessDto, userId);
  }

  @Get()
  async findAll(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    this.logger.log(`Finding all job processes for user ${userId}`);
    return await this.jobProcessesService.findAll(userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    const jobProcess = await this.jobProcessesService.findOne(+id, userId);
    if (!jobProcess) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }
    return jobProcess;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateJobProcessesDto: UpdateJobProcessesDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.userId;
    this.logger.log(`Updating job process with id ${id} for user ${userId}`);
    return await this.jobProcessesService.update(
      +id,
      updateJobProcessesDto,
      userId
    );
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req: CustomRequest) {
    if (!req.user) {
      this.logger.error("User not found in request");
      throw new NotFoundException("User not found in request");
    }
    const userId = req.user.userId;
    this.logger.log(`Removing job process with id ${id} for user ${userId}`);
    return await this.jobProcessesService.remove(+id, userId);
  }
}
