import { Module } from "@nestjs/common";
import { JobsService } from "./job.service.js";
import { JobsController } from "./job.controller.js";
import { DatabaseModule } from "../database/database.module.js";

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
