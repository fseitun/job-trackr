import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateJobProcessesDto } from "./dto/create-job-processes.dto.js";
import { UpdateJobProcessesDto } from "./dto/update-job-processes.dto.js";
import { jobProcesses, interviews } from "../database/schema.js";
import { eq, and, sql } from "drizzle-orm";

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
      vacationDays: createJobProcessesDto.vacationDays ?? 0,
      holidayDays: createJobProcessesDto.holidayDays ?? 0,
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
      vacationsDays: updateJobProcessesDto.vacationDays,
      holidaysDays: updateJobProcessesDto.holidayDays,
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
    this.logger.log("Fetching all job processes with last interaction date");
    const jobProcessesWithLastInteraction = await this.dbService.db
      .select({
        id: jobProcesses.id,
        hiringCompany: jobProcesses.hiringCompany,
        recruitingCompany: jobProcesses.recruitingCompany,
        position: jobProcesses.position,
        recruiterName: jobProcesses.recruiterName,
        recruitmentChannel: jobProcesses.recruitmentChannel,
        monthlySalary: jobProcesses.monthlySalary,
        vacationsDays: jobProcesses.vacationsDays,
        holidaysDays: jobProcesses.holidaysDays,
        jobDescription: jobProcesses.jobDescription,
        directHire: jobProcesses.directHire,
        timeZone: jobProcesses.timeZone,
        lastInteraction: sql<Date>`MAX(${interviews.interviewDate})`,
      })
      .from(jobProcesses)
      .leftJoin(
        interviews,
        and(
          eq(interviews.jobProcessId, jobProcesses.id),
          eq(interviews.userId, userId)
        )
      )
      .where(eq(jobProcesses.userId, userId))
      .groupBy(jobProcesses.id);

    this.logger.debug(
      "Job Processes with Last Interaction:",
      jobProcessesWithLastInteraction
    );
    return jobProcessesWithLastInteraction;
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
