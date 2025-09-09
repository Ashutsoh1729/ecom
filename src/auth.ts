import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/client";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // This callback runs whenever a JWT is created or updated.
    async jwt({ token }) {
      /*       console.log("--- JWT CALLBACK ---"); // Note to see when it runs
      console.log("Token at start:", token); // See the initial token */

      // getting the users id
      if (!token.sub) return token; // As token.sub is the userID

      // Fetching the most upto date user data from the db
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      // If the user does not exits do nothing
      if (!existingUser) return token;

      // Now adding the fresh role from the database
      token.role = existingUser.role;
      // console.log("Token after DB check:", token); // See the token with the fresh role

      return token;
    },
    // This callback runs whenever a session is checked
    async session({ session, token }) {
      // It passes the role from the token to the client-side session object
      if (session.user) {
        session.user.role = token.role as "Buyer" | "Seller";
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
