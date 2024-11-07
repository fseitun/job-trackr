import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, IsDate } from "class-validator";

export class CreateInterviewDto {
  @IsNumber()
  jobId!: number;

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
