import { Module } from "@nestjs/common";
import { InterviewsModule } from "./interviews/interviews.module";
import { JobProcessesModule } from "./job-processes/job-processes.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    InterviewsModule,
    JobProcessesModule,
  ],
})
export class AppModule {}
