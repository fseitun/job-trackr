import { CreateJobsDto } from './create-job.dto.js';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobDto extends PartialType(CreateJobsDto) {}
