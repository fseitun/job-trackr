export interface Job {
    id: string;
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
export type CreateJobDto = Omit<Job, 'id' | 'interviews' | 'lastInteraction'>;
export type UpdateJobDto = Partial<Job>;

export interface Interview {
    id: string;
    jobId: string;
    interviewerName: string;
    interviewerRole: string;
    interviewDate: string;
    notes?: string;
}
export type CreateInterviewDto = Omit<Interview, 'id'>;
export type UpdateInterviewDto = Partial<Interview>;

export interface UserPreferences {
    columns: Record<keyof Job, boolean>;
}
