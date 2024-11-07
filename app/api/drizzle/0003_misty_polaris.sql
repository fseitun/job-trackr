DROP VIEW "public"."jobsWithLastInteraction";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "interviewer_name" TO "interviewerName";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "interviewer_role" TO "interviewerRole";--> statement-breakpoint
ALTER TABLE "job_processes" RENAME COLUMN "hiring_company" TO "hiringCompany";--> statement-breakpoint
ALTER TABLE "job_processes" RENAME COLUMN "direct_hire" TO "directHire";--> statement-breakpoint
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE VIEW "public"."jobsWithLastInteraction" AS (select "job_processes"."id", "job_processes"."user_id", "job_processes"."hiringCompany", "job_processes"."recruiting_company", "job_processes"."position", "job_processes"."recruiter_name", "job_processes"."recruitment_channel", "job_processes"."monthly_salary", "job_processes"."vacation_days", "job_processes"."holiday_days", "job_processes"."job_description", "job_processes"."directHire", "job_processes"."time_zone", "job_processes"."updated_at", "job_processes"."created_at", max("interviews"."interview_date") as "last_interaction" from "job_processes" left join "interviews" on "job_processes"."id" = "interviews"."job_process_id" group by "job_processes"."id", "job_processes"."user_id", "job_processes"."hiringCompany", "job_processes"."recruiting_company", "job_processes"."position", "job_processes"."recruiter_name", "job_processes"."recruitment_channel", "job_processes"."monthly_salary", "job_processes"."vacation_days", "job_processes"."holiday_days", "job_processes"."job_description", "job_processes"."directHire", "job_processes"."time_zone", "job_processes"."updated_at", "job_processes"."created_at");