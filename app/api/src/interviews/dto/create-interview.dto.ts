import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsDate,
  IsNotEmpty,
  IsDefined,
  IsUUID,
} from "class-validator";

export class CreateInterviewDto {
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  interviewerName!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  interviewerRole!: string;

  @Type(() => Date)
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  interviewDate!: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}
