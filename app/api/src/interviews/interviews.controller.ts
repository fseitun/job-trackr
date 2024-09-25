import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InterviewsService } from "./interviews.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { UpdateInterviewDto } from "./dto/update-interview.dto";

@Controller("interviews")
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  async create(@Body() createInterviewDto: CreateInterviewDto) {
    return await this.interviewsService.create(createInterviewDto);
  }

  @Get()
  async findAll() {
    return await this.interviewsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.interviewsService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateInterviewDto: UpdateInterviewDto
  ) {
    return await this.interviewsService.update(+id, updateInterviewDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.interviewsService.remove(+id);
  }
}
