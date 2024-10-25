import { Module } from "@nestjs/common";
import { InterviewsService } from "./interviews.service.js";
import { InterviewsController } from "./interviews.controller.js";
import { DatabaseModule } from "../database/database.module.js";

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewsController],
  providers: [InterviewsService],
})
export class InterviewsModule {}
