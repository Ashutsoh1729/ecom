ALTER TABLE "products" ADD CONSTRAINT "products_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "stores" ADD CONSTRAINT "stores_store_name_unique" UNIQUE("store_name");