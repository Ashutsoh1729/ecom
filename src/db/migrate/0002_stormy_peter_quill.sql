ALTER TABLE "sellers" ADD COLUMN "phone_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "sellers" ADD CONSTRAINT "sellers_phone_number_unique" UNIQUE("phone_number");