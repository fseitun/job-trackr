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
  lastInteraction: string;
  interviews: Interview[];
}

export type CreateJobProcess = Omit<JobProcess, "id" | "interviews">;

export interface CreateInterviewDto {
  interviewerName: string;
  interviewerRole: string;
  interviewDate: string;
  notes?: string;
  jobProcessId: number;
}

export interface UpdateInterviewDto {
  interviewerName?: string;
  interviewerRole?: string;
  interviewDate?: string;
  notes?: string;
}

export interface Interview {
  id: number;
  interviewerName: string;
  interviewerRole: string;
  interviewDate: string;
  notes?: string;
}
