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
} from "@nestjs/common";
import { InterviewsService } from "./interviews.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { UpdateInterviewDto } from "./dto/update-interview.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CustomRequest } from "../types/custom-request.interface";

@Controller("interviews")
@UseGuards(JwtAuthGuard)
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.userId;
    return await this.interviewsService.create(createInterviewDto, userId);
  }

  @Get()
  async findAll(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    return await this.interviewsService.findAll(userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    return await this.interviewsService.findOne(+id, userId);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.userId;
    return await this.interviewsService.update(+id, updateInterviewDto, userId);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    return await this.interviewsService.remove(+id, userId);
  }
}
