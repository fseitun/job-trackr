import { Request } from "express";
import { UserPayload } from "./user.interface";

export interface CustomRequest extends Request {
  user: UserPayload;
}
