import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobProcesses = pgTable("job_processes", {
  id: serial("id").primaryKey(),
  hiringCompany: varchar("hiring_company", { length: 255 }).notNull(),
  recruitingCompany: varchar("recruiting_company", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  recruiterName: varchar("recruiter_name", { length: 255 }).notNull().default(""),
  recruitmentChannel: varchar("recruitment_channel", { length: 255 }).notNull().default(""),
  monthlySalary: integer("monthly_salary").default(0),
  vacationsDays: integer("vacations_days").default(0),
  holidaysDays: integer("holidays_days").default(0),
  jobDescription: text("job_description").default(""),
  // techStack: jsonb("tech_stack").default([]), TODO: rethink better way to store tech stack, it will be in the JD.
  directHire: boolean("direct_hire").default(false),
  timeZone: varchar("time_zone", { length: 255 }).default(""),
});

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  jobProcessId: integer("job_process_id")
    .references(() => jobProcesses.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  interviewerName: varchar("interviewer_name", { length: 255 }).notNull(),
  interviewerRole: varchar("interviewer_role", { length: 255 }).notNull(),
  interviewDate: timestamp("interview_date").notNull().defaultNow(),
  notes: varchar("notes", { length: 500 }),
});
