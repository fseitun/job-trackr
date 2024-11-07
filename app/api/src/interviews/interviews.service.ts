import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateInterviewDto } from "./dto/create-interview.dto.js";
import { UpdateInterviewDto } from "./dto/update-interview.dto.js";
import { interviews, jobs } from "../database/schema.js";
import { eq, and } from "drizzle-orm";

@Injectable()
export class InterviewsService {
  private readonly logger = new Logger(InterviewsService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createInterviewDto: CreateInterviewDto, userId: number) {
    this.logger.log(
      `Creating interview with data: ${JSON.stringify(createInterviewDto)}`
    );

    this.logger.debug(JSON.stringify(createInterviewDto, null, 2));

    const job = await this.dbService.db
      .select()
      .from(jobs)
      .where(
        and(eq(jobs.id, createInterviewDto.jobId), eq(jobs.userId, userId))
      );

    if (job.length === 0) {
      throw new NotFoundException("Job not found or not owned by user");
    }

    const [newInterview] = await this.dbService.db
      .insert(interviews)
      .values({ ...createInterviewDto, userId })
      .returning();

    return newInterview;
  }

  async findAll(userId: number) {
    this.logger.log("Fetching all interviews");

    return await this.dbService.db
      .select()
      .from(interviews)
      .where(eq(interviews.userId, userId));
  }

  async findOne(id: number, userId: number) {
    this.logger.log(`Fetching interview with id: ${id}`);

    const [interview] = await this.dbService.db
      .select()
      .from(interviews)
      .where(and(eq(interviews.id, id), eq(interviews.userId, userId)));

    if (!interview) {
      throw new NotFoundException(`Interview with id ${id} not found`);
    }

    return interview;
  }

  async update(
    id: number,
    updateInterviewDto: UpdateInterviewDto,
    userId: number
  ) {
    this.logger.log(`Updating interview with id: ${id}`);

    if (updateInterviewDto.interviewDate) {
      if (isNaN(new Date(updateInterviewDto.interviewDate).getTime())) {
        this.logger.error("Invalid interviewDate format.");
        throw new BadRequestException("Invalid interviewDate format.");
      }
      const existingInterview = await this.dbService.db
        .select()
        .from(interviews)
        .where(and(eq(interviews.id, id), eq(interviews.userId, userId)));

      if (existingInterview.length === 0) {
        throw new NotFoundException(`Interview with id ${id} not found`);
      }

      const [updatedInterview] = await this.dbService.db
        .update(interviews)
        .set(updateInterviewDto)
        .where(and(eq(interviews.id, id), eq(interviews.userId, userId)))
        .returning();

      return updatedInterview;
    }
  }

  async remove(id: number, userId: number) {
    this.logger.log(`Deleting interview with id: ${id}`);

    const existingInterview = await this.dbService.db
      .select()
      .from(interviews)
      .where(and(eq(interviews.id, id), eq(interviews.userId, userId)));

    if (existingInterview.length === 0) {
      throw new NotFoundException(`Interview with id ${id} not found`);
    }

    await this.dbService.db
      .delete(interviews)
      .where(and(eq(interviews.id, id), eq(interviews.userId, userId)));
    return { deleted: true };
  }
}
