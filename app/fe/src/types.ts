export interface JobProcess {
  id: number;
  hiringCompany: string;
  recruitingCompany: string;
  position: string;
  recruiterName: string;
  recruitmentChannel: string;
  monthlySalary: number;
  vacationDays: number;
  holidayDays: number;
  jobDescription: string;
  directHire: boolean;
  timeZone: string;
  lastInteraction: string;
  interviews: Interview[];
}
export type CreateJobProcessDto = Omit<
  JobProcess,
  "id" | "interviews" | "lastInteraction"
>;
export type UpdateJobProcessDto = Partial<JobProcess>;

export interface Interview {
  id: number;
  interviewerName: string;
  interviewerRole: string;
  interviewDate: string;
  notes?: string;
}
export type CreateInterviewDto = Omit<Interview, "id">;
export type UpdateInterviewDto = Partial<Interview>;
