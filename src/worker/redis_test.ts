import { db } from "@/db/client";
import { redis_client } from "@/util/upstash";

(async function () {
  //  NOTE: Cache function for all products

  // getting the data from pg

  // checking the data exists or not first
  let redisAllProducts = await redis_client.get("allProduct");

  if (redisAllProducts === null) {
    const products = await db.query.products.findMany({
      columns: { createdAt: false, updatedAt: false },
    });
    // redis sdk will stringify for us
    redis_client.set("allProduct", products);

    // we have saved a network trip
    redisAllProducts = products;
  }
  console.log(typeof redisAllProducts);

  //
})();
