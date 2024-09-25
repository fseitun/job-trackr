import {
  IsString,
  IsDateString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class CreateJobProcessesDto {
  @IsString()
  hiringCompany!: string;

  @IsString()
  recruitingCompany!: string;

  @IsString()
  position!: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  recruiterName?: string;

  @IsOptional()
  @IsString()
  recruitmentChannel?: string;

  @IsOptional()
  @IsNumber()
  monthlySalary?: number;

  @IsOptional()
  @IsNumber()
  vacationsDays?: number;

  @IsOptional()
  @IsNumber()
  holidaysDays?: number;

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsOptional()
  @IsBoolean()
  directHire?: boolean;

  @IsOptional()
  @IsString()
  timeZone?: string;
}
