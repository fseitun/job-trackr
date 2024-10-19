import { Controller, UseGuards, Get, Post, Res, Logger } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from "express";

@Controller("auth")
@UseGuards(JwtAuthGuard)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @Get("validate")
  async validate() {
    this.logger.log("Validating token");
    return { message: "Authenticated" };
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    this.logger.log("Logging out user");
    response.clearCookie("access_token");
    return { message: "Logged out successfully" };
  }
}
