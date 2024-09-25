import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DatabaseService } from "../database/database.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { UpdateInterviewDto } from "./dto/update-interview.dto";
import { interviews } from "../database/schema";

@Injectable()
export class InterviewsService {
  private readonly logger = new Logger(InterviewsService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createInterviewDto: CreateInterviewDto) {
    this.logger.log(
      `Creating interview with data: ${JSON.stringify(createInterviewDto)}`
    );

    this.logger.debug(JSON.stringify(createInterviewDto, null, 2));

    const [newInterview] = await this.dbService.db
      .insert(interviews)
      .values(createInterviewDto)
      .returning();
    return newInterview;
  }

  async findAll() {
    this.logger.log("Fetching all interviews");
    return await this.dbService.db.select().from(interviews);
  }

  async findOne(id: number) {
    this.logger.log(`Fetching interview with id: ${id}`);

    const [interview] = await this.dbService.db
      .select()
      .from(interviews)
      .where(eq(interviews.id, id));
    if (!interview) {
      throw new NotFoundException(`Job process with id ${id} not found`);
    }
    return interview;
  }

  async update(id: number, updateInterviewDto: UpdateInterviewDto) {
    this.logger.log(`Updating interview with id: ${id}`);

    if (updateInterviewDto.interviewDate) {
      if (isNaN(new Date(updateInterviewDto.interviewDate).getTime())) {
        this.logger.error("Invalid interviewDate format.");
        throw new BadRequestException("Invalid interviewDate format.");
      }
    }

    const [updatedInterview] = await this.dbService.db
      .update(interviews)
      .set(updateInterviewDto)
      .where(eq(interviews.id, id))
      .returning();
    return updatedInterview;
  }

  async remove(id: number) {
    this.logger.log(`Deleting interview with id: ${id}`);
    await this.dbService.db.delete(interviews).where(eq(interviews.id, id));
    return { deleted: true };
  }
}
