import { PartialType } from "@nestjs/mapped-types";
import { CreateJobsDto } from "./create-job.dto.js";

export class UpdateJobDto extends PartialType(CreateJobsDto) {}
