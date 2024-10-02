import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateJobProcessesDto } from "./dto/create-job-processes.dto";
import { UpdateJobProcessesDto } from "./dto/update-job-processes.dto";
import { jobProcesses, interviews } from "../database/schema";
import { eq, and } from "drizzle-orm";

@Injectable()
export class JobProcessesService {
  private readonly logger = new Logger(JobProcessesService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createJobProcessesDto: CreateJobProcessesDto, userId: number) {
    this.logger.log(
      `Creating job process with data: ${JSON.stringify(createJobProcessesDto)}`
    );

    const jobProcessData = {
      hiringCompany: createJobProcessesDto.hiringCompany,
      recruitingCompany: createJobProcessesDto.recruitingCompany,
      position: createJobProcessesDto.position,
      recruiterName: createJobProcessesDto.recruiterName,
      recruitmentChannel: createJobProcessesDto.recruitmentChannel,
      monthlySalary: createJobProcessesDto.monthlySalary ?? 0,
      vacationsDays: createJobProcessesDto.vacationsDays ?? 0,
      holidaysDays: createJobProcessesDto.holidaysDays ?? 0,
      jobDescription: createJobProcessesDto.jobDescription ?? "",
      directHire: createJobProcessesDto.directHire ?? false,
      timeZone: createJobProcessesDto.timeZone ?? "",
    };

    const [newJobProcess] = await this.dbService.db
      .insert(jobProcesses)
      .values({ ...jobProcessData, userId })
      .returning();

    return newJobProcess;
  }

  async update(
    id: number,
    updateJobProcessesDto: UpdateJobProcessesDto,
    userId: number
  ) {
    this.logger.log(`Updating job process with id: ${id}`);

    const updatedData = {
      ...updateJobProcessesDto,
      monthlySalary: updateJobProcessesDto.monthlySalary,
      vacationsDays: updateJobProcessesDto.vacationsDays,
      holidaysDays: updateJobProcessesDto.holidaysDays,
      directHire: updateJobProcessesDto.directHire,
    };

    const existingJobProcess = await this.dbService.db
      .select()
      .from(jobProcesses)
      .where(and(eq(jobProcesses.id, id), eq(jobProcesses.userId, userId)));

    if (existingJobProcess.length === 0) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }

    const [updatedJobProcess] = await this.dbService.db
      .update(jobProcesses)
      .set(updatedData)
      .where(and(and(eq(jobProcesses.id, id), eq(jobProcesses.userId, userId))))
      .returning();

    if (!updatedJobProcess) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }
    return updatedJobProcess;
  }

  async findAll(userId: number) {
    this.logger.log("Fetching all job processes");
    return this.dbService.db
      .select()
      .from(jobProcesses)
      .where(eq(jobProcesses.userId, userId));
  }

  async findOne(id: number, userId: number) {
    this.logger.log(`Fetching job process with id: ${id} and its interviews`);

    const [jobProcess] = await this.dbService.db
      .select()
      .from(jobProcesses)
      .where(and(eq(jobProcesses.id, id), eq(jobProcesses.userId, userId)));

    if (!jobProcess) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }

    const associatedInterviews = await this.dbService.db
      .select()
      .from(interviews)
      .where(
        and(eq(interviews.jobProcessId, id), eq(interviews.userId, userId))
      );

    return { ...jobProcess, interviews: associatedInterviews };
  }

  async remove(id: number, userId: number) {
    this.logger.log(`Deleting job process with id: ${id}`);

    const existingJobProcess = await this.dbService.db
      .select()
      .from(jobProcesses)
      .where(and(eq(jobProcesses.id, id), eq(jobProcesses.userId, userId)));

    if (existingJobProcess.length === 0) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }

    await this.dbService.db
      .delete(jobProcesses)
      .where(and(eq(jobProcesses.id, id), eq(jobProcesses.userId, userId)));
    return { deleted: true };
  }
}
