ALTER TABLE "stores" DROP CONSTRAINT "stores_seller_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "stores" ADD CONSTRAINT "stores_seller_id_sellers_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers"("id") ON DELETE set null ON UPDATE no action;