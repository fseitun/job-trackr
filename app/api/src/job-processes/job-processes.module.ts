import { Module } from "@nestjs/common";
import { JobProcessesService } from "./job-processes.service";
import { JobProcessesController } from "./job-processes.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [JobProcessesController],
  providers: [JobProcessesService],
})
export class JobProcessesModule {}
