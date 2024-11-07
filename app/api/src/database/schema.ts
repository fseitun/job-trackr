import { eq, getTableColumns, sql } from "drizzle-orm";
import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  pgView,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const jobProcesses = pgTable("job_processes", {
  id: serial().primaryKey(),
  userId: integer()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  hiringCompany: varchar({ length: 255 }).notNull(),
  recruitingCompany: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 255 }).notNull(),
  recruiterName: varchar({ length: 255 }).notNull().default(""),
  recruitmentChannel: varchar({ length: 255 }).notNull().default(""),
  monthlySalary: integer().default(0),
  vacationDays: integer().default(0),
  holidayDays: integer().default(0),
  jobDescription: text().default(""),
  // techStack: jsonb("tech_stack").default([]), TODO: rethink better way to store tech stack, it will be in the JD.
  directHire: boolean().default(false),
  timeZone: varchar({ length: 255 }).default(""),
});

export const interviews = pgTable("interviews", {
  id: serial().primaryKey(),
  jobProcessId: integer()
    .references(() => jobProcesses.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  userId: integer()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  interviewerName: varchar({ length: 255 }).notNull(),
  interviewerRole: varchar({ length: 255 }).notNull(),
  interviewDate: timestamp().notNull().defaultNow(),
  notes: varchar({ length: 500 }),
});

const jobProcessColumns = getTableColumns(jobProcesses);

export const jobs = pgView("jobsWithLastInteraction").as((qb) =>
  qb
    .select({
      ...jobProcessColumns,
      lastInteraction: sql<Date>`max(${interviews.interviewDate})`.as(
        "last_interaction"
      ),
    })
    .from(jobProcesses)
    .leftJoin(interviews, eq(jobProcesses.id, interviews.jobProcessId))
    .groupBy(...Object.values(jobProcessColumns))
);
