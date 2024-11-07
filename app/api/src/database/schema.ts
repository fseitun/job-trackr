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
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  hiringCompany: varchar({ length: 255 }).notNull(),
  recruitingCompany: varchar("recruiting_company", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  recruiterName: varchar("recruiter_name", { length: 255 })
    .notNull()
    .default(""),
  recruitmentChannel: varchar("recruitment_channel", { length: 255 })
    .notNull()
    .default(""),
  monthlySalary: integer("monthly_salary").default(0),
  vacationDays: integer("vacation_days").default(0),
  holidayDays: integer("holiday_days").default(0),
  jobDescription: text("job_description").default(""),
  // techStack: jsonb("tech_stack").default([]), TODO: rethink better way to store tech stack, it will be in the JD.
  directHire: boolean().default(false),
  timeZone: varchar("time_zone", { length: 255 }).default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
//

export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .references(() => jobs.id, {
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
  interviewDate: timestamp("interview_date").notNull().defaultNow(),
  notes: varchar("notes", { length: 500 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const jobColumns = getTableColumns(jobs);

export const jobsWithLastInteraction = pgView("jobsWithLastInteraction").as(
  (qb) =>
    qb
      .select({
        ...jobColumns,
        lastInteraction: sql<Date>`max(${interviews.interviewDate})`.as(
          "last_interaction"
        ),
      })
      .from(jobs)
      .leftJoin(interviews, eq(jobs.id, interviews.jobId))
      .groupBy(...Object.values(jobColumns))
);
