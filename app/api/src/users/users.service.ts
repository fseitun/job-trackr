import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { DatabaseService } from "../database/database.service.js";
import { users } from "../database/schema.js";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new ConflictException("User with this email already exists");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [newUser] = await this.dbService.db
      .insert(users)
      .values({
        email,
        passwordHash,
      })
      .returning();

    return { id: newUser.id, email: newUser.email };
  }

  async findByEmail(email: string) {
    const user = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user.length > 0 ? user[0] : null;
  }

  async findById(id: number) {
    const user = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user.length > 0 ? user[0] : null;
  }
}
