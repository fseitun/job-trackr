CREATE TABLE IF NOT EXISTS "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_process_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"interviewer_name" varchar(255) NOT NULL,
	"interviewer_role" varchar(255) NOT NULL,
	"interview_date" timestamp DEFAULT now() NOT NULL,
	"notes" varchar(500)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_processes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"hiring_company" varchar(255) NOT NULL,
	"recruiting_company" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"recruiter_name" varchar(255) DEFAULT '' NOT NULL,
	"recruitment_channel" varchar(255) DEFAULT '' NOT NULL,
	"monthly_salary" integer DEFAULT 0,
	"vacation_days" integer DEFAULT 0,
	"holiday_days" integer DEFAULT 0,
	"job_description" text DEFAULT '',
	"direct_hire" boolean DEFAULT false,
	"time_zone" varchar(255) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_job_process_id_job_processes_id_fk" FOREIGN KEY ("job_process_id") REFERENCES "public"."job_processes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_processes" ADD CONSTRAINT "job_processes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
