import { Controller, UseGuards, Get, Post, Res } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from "express";

@Controller("auth")
@UseGuards(JwtAuthGuard)
export class AuthController {
  @Get("validate")
  async validate() {
    return { message: "Authenticated" };
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("access_token");
    return { message: "Logged out successfully" };
  }
}
