import { Redis } from "@upstash/redis";

export const redis_client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const CART_SYNC_QUEUE = "queue:cart-sync";
