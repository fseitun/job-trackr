import {
    IsOptional,
    IsString,
    IsDateString,
    IsNotEmpty,
    IsDefined,
    IsUUID,
} from 'class-validator';

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

    @IsDefined()
    @IsNotEmpty()
    @IsDateString()
    interviewDate!: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    updatedAt?: Date;
}
