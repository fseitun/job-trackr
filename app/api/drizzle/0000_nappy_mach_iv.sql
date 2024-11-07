CREATE TABLE IF NOT EXISTS "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"userId" integer NOT NULL,
	"interviewerName" varchar(255) NOT NULL,
	"interviewerRole" varchar(255) NOT NULL,
	"interview_date" timestamp DEFAULT now() NOT NULL,
	"notes" varchar(500),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"hiringCompany" varchar(255) NOT NULL,
	"recruiting_company" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"recruiter_name" varchar(255) DEFAULT '' NOT NULL,
	"recruitment_channel" varchar(255) DEFAULT '' NOT NULL,
	"monthly_salary" integer DEFAULT 0,
	"vacation_days" integer DEFAULT 0,
	"holiday_days" integer DEFAULT 0,
	"job_description" text DEFAULT '',
	"directHire" boolean DEFAULT false,
	"time_zone" varchar(255) DEFAULT '',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE VIEW "public"."jobsWithLastInteraction" AS (select "jobs"."id", "jobs"."user_id", "jobs"."hiringCompany", "jobs"."recruiting_company", "jobs"."position", "jobs"."recruiter_name", "jobs"."recruitment_channel", "jobs"."monthly_salary", "jobs"."vacation_days", "jobs"."holiday_days", "jobs"."job_description", "jobs"."directHire", "jobs"."time_zone", "jobs"."updated_at", "jobs"."created_at", max("interviews"."interview_date") as "last_interaction" from "jobs" left join "interviews" on "jobs"."id" = "interviews"."job_id" group by "jobs"."id", "jobs"."user_id", "jobs"."hiringCompany", "jobs"."recruiting_company", "jobs"."position", "jobs"."recruiter_name", "jobs"."recruitment_channel", "jobs"."monthly_salary", "jobs"."vacation_days", "jobs"."holiday_days", "jobs"."job_description", "jobs"."directHire", "jobs"."time_zone", "jobs"."updated_at", "jobs"."created_at");