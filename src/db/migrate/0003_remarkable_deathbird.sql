ALTER TABLE "products" ADD COLUMN "main_img" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_main_img_unique" UNIQUE("main_img");