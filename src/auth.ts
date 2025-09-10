import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/client";
import { eq } from "drizzle-orm";
import { sellers, users } from "./db/schema";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),

  callbacks: {
    // This callback runs whenever a JWT is created or updated.
    async jwt({ token }) {
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
      //
      if (existingUser.role === "Seller") {
        const seller = await db.query.sellers.findFirst({
          where: eq(sellers.userId, existingUser.id),
        });
        const sellerId = seller?.id;
        token.sellerId = sellerId;
      }

      return token;
    },
    // This callback runs whenever a session is checked
    // We can override callbacks here to add DB logic
    // This session callback runs on the server, not the edge.
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // Assigning the user role of the token to the session
        session.user.role = token.role; // <-- Add the role from the DB
      }
      if (token.sellerId && session.user) {
        session.user.sellerId = token.sellerId;
      }

      return session;
    },
  },
});
