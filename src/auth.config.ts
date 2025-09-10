// auth.config.ts

import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Notice this is just a plain object, not the NextAuth() call
export default {
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // We keep the callbacks here as they are Edge-compatible
    async jwt({ token }) {
      if (!token.sub) return token;
      // You can't do a DB call here, but you can add static roles or pass-through
      // For now, let's simplify and assume the role will be handled in auth.ts
      // A more advanced pattern would be to fetch the role in the session callback
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // You can't access existingUser.role here directly
        // But you can pass basic info from the token to the session
        session.user.id = token.sub;
        // The role will be added in the main auth.ts session callback
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
