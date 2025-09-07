/* // Instead of dotenv i am using direnv for development phase

import { db } from "../client";
// import dotenv from "dotenv";
import { userTable } from "../schema";

// dotenv.config({ path: ".env.local" });

async function main() {
  const user: typeof userTable.$inferInsert = {
    name: "Rhon",
    age: 21,
    email: "rhon@email.com",
  };

  // inserting into the db

  await db.insert(userTable).values(user);
  console.log("New user is created.");
}

main(); */
