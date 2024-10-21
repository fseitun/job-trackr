export interface JobProcess {
  id: number;
  hiringCompany: string;
  recruitingCompany: string;
  position: string;
  recruiterName: string;
  recruitmentChannel: string;
  monthlySalary: number;
  vacationsDays: number;
  holidaysDays: number;
  jobDescription: string;
  directHire: boolean;
  timeZone: string;
  lastInteraction: Date;
  interviews: Interview[];
}

export interface Interview {
  id: number;
  jobProcessId: number;
  interviewerName: string;
  interviewerRole: string;
  interviewDate: Date;
  notes?: string;
}

export type CreateJobProcess = Omit<JobProcess, "id" | "interviews">;
