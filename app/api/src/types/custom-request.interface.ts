import { Request } from 'express';
import { UserPayload } from './user.interface.js';

export interface CustomRequest extends Request {
    user: UserPayload;
}
