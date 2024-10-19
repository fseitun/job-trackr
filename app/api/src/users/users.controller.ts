import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Logger,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private readonly logger = new Logger(UsersController.name);

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.log("Registering a new user");
    return await this.usersService.create(createUserDto);
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      this.logger.error("User not found in request");
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      this.logger.error("Invalid credentials");
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    this.logger.log("User logged in successfully");

    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { token };
  }
}
