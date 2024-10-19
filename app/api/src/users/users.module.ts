import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
