import { PartialType } from "@nestjs/mapped-types";
import { CreateJobProcessesDto } from "./create-job-processes.dto";

export class UpdateJobProcessesDto extends PartialType(CreateJobProcessesDto) {}
