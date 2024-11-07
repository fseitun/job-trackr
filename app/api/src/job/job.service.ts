import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateJobsDto } from "./dto/create-job.dto.js";
import { UpdateJobDto } from "./dto/update-job.dto.js";
import { jobs, interviews } from "../database/schema.js";
import { eq, and, sql } from "drizzle-orm";

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createJobsDto: CreateJobsDto, userId: string) {
    this.logger.log(`Creating job with data: ${JSON.stringify(createJobsDto)}`);

    const jobData = {
      hiringCompany: createJobsDto.hiringCompany,
      recruitingCompany: createJobsDto.recruitingCompany,
      position: createJobsDto.position,
      recruiterName: createJobsDto.recruiterName,
      recruitmentChannel: createJobsDto.recruitmentChannel,
      monthlySalary: createJobsDto.monthlySalary ?? 0,
      vacationDays: createJobsDto.vacationDays ?? 0,
      holidayDays: createJobsDto.holidayDays ?? 0,
      jobDescription: createJobsDto.jobDescription ?? "",
      directHire: createJobsDto.directHire ?? false,
      timeZone: createJobsDto.timeZone ?? "",
    };

    const [newJob] = await this.dbService.db
      .insert(jobs)
      .values({ ...jobData, userId })
      .returning();

    return newJob;
  }

  async update(id: string, updateJobDto: UpdateJobDto, userId: string) {
    this.logger.log(`Updating job with id: ${id}`);

    const updatedData = {
      ...updateJobDto,
      monthlySalary: updateJobDto.monthlySalary,
      vacationsDays: updateJobDto.vacationDays,
      holidaysDays: updateJobDto.holidayDays,
      directHire: updateJobDto.directHire,
    };

    const existingJob = await this.dbService.db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

    if (existingJob.length === 0) {
      throw new NotFoundException(`job with id ${id} not found`);
    }

    const [updatedJob] = await this.dbService.db
      .update(jobs)
      .set(updatedData)
      .where(and(and(eq(jobs.id, id), eq(jobs.userId, userId))))
      .returning();

    if (!updatedJob) {
      throw new NotFoundException(`job with id ${id} not found`);
    }
    return updatedJob;
  }

  async findAll(userId: string) {
    this.logger.log("Fetching all jobs with last interaction date");
    const jobsWithLastInteraction = await this.dbService.db
      .select({
        id: jobs.id,
        hiringCompany: jobs.hiringCompany,
        recruitingCompany: jobs.recruitingCompany,
        position: jobs.position,
        recruiterName: jobs.recruiterName,
        recruitmentChannel: jobs.recruitmentChannel,
        monthlySalary: jobs.monthlySalary,
        vacationsDays: jobs.vacationDays,
        holidaysDays: jobs.holidayDays,
        jobDescription: jobs.jobDescription,
        directHire: jobs.directHire,
        timeZone: jobs.timeZone,
        lastInteraction: sql<Date>`MAX(${interviews.interviewDate})`,
      })
      .from(jobs)
      .leftJoin(interviews, and(eq(interviews.jobId, jobs.id)))
      .where(eq(jobs.userId, userId))
      .groupBy(jobs.id);

    this.logger.debug("Job with Last Interaction:", jobsWithLastInteraction);
    return jobsWithLastInteraction;
  }

  async findOne(id: string, userId: string) {
    this.logger.log(`Fetching job with id: ${id} and its interviews`);

    const [job] = await this.dbService.db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

    if (!job) {
      throw new NotFoundException(`job with id ${id} not found`);
    }

    const associatedInterviews = await this.dbService.db
      .select()
      .from(interviews)
      .where(eq(interviews.jobId, id));

    return { ...job, interviews: associatedInterviews };
  }

  async remove(id: string, userId: string) {
    this.logger.log(`Deleting job with id: ${id}`);

    const existingJob = await this.dbService.db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));

    if (existingJob.length === 0) {
      throw new NotFoundException(`job with id ${id} not found`);
    }

    await this.dbService.db
      .delete(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)));
    return { deleted: true };
  }
}
