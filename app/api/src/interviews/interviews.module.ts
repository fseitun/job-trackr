import { Module } from "@nestjs/common";
import { InterviewsService } from "./interviews.service";
import { InterviewsController } from "./interviews.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewsController],
  providers: [InterviewsService],
})
export class InterviewsModule {}
