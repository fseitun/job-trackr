import { Module } from "@nestjs/common";
import { JobProcessesService } from "./job-processes.service.js";
import { JobProcessesController } from "./job-processes.controller.js";
import { DatabaseModule } from "../database/database.module.js";

@Module({
  imports: [DatabaseModule],
  controllers: [JobProcessesController],
  providers: [JobProcessesService],
})
export class JobProcessesModule {}
