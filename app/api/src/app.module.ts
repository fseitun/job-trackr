import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./users/users.module";
import { InterviewsModule } from "./interviews/interviews.module";
import { JobProcessesModule } from "./job-processes/job-processes.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "1h" },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    InterviewsModule,
    JobProcessesModule,
  ],
})
export class AppModule {}
