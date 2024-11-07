import { Type } from "class-transformer";
import { IsOptional, IsString, IsDate } from "class-validator";

export class CreateInterviewDto {
  @IsString()
  jobId!: string;

  @IsString()
  interviewerName!: string;

  @IsString()
  interviewerRole!: string;

  @Type(() => Date)
  @IsDate()
  interviewDate!: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}
