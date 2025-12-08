CREATE TYPE "public"."issue_status" AS ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DEBUG', 'DONE', 'DEPLOYED');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('SUPER', 'ADMIN', 'SUPPORT', 'BASIC');--> statement-breakpoint
CREATE TABLE "issue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(120) NOT NULL,
	"description" text NOT NULL,
	"issue_status" "issue_status" DEFAULT 'TODO' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"email" varchar(250) NOT NULL,
	"mobile" varchar(16) NOT NULL,
	"mobile_country_code" varchar(4) NOT NULL,
	"user_role" "user_role" DEFAULT 'BASIC' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_mobile_unique" UNIQUE("mobile")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_index" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "mobile_index" ON "user" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX "mobile_country_code_index" ON "user" USING btree ("mobile_country_code");