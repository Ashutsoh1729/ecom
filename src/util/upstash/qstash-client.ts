import { Client } from "@upstash/qstash";

export const qstash_client = new Client({
  token: process.env.QSTASH_TOKEN,
});
