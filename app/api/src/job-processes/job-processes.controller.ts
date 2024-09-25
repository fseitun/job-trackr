import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { JobProcessesService } from "./job-processes.service";
import { CreateJobProcessesDto } from "./dto/create-job-processes.dto";
import { UpdateJobProcessesDto } from "./dto/update-job-processes.dto";

@Controller("job-processes")
export class JobProcessesController {
  constructor(private readonly jobProcessesService: JobProcessesService) {}

  @Post()
  async create(@Body() createJobProcessDto: CreateJobProcessesDto) {
    return await this.jobProcessesService.create(createJobProcessDto);
  }

  @Get()
  async findAll() {
    return await this.jobProcessesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const jobProcess = await this.jobProcessesService.findOne(+id);
    if (!jobProcess) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }
    return jobProcess;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateJobProcessesDto: UpdateJobProcessesDto
  ) {
    return await this.jobProcessesService.update(+id, updateJobProcessesDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.jobProcessesService.remove(+id);
  }
}
