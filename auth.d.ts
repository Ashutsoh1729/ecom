// auth.d.ts
//
//This file doesn't run any code. It just gives TypeScript new rules, essentially saying, "By the way, from now on, whenever you see a Session object or a JWT token from next-auth, expect it to have a role property."

import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object to include the 'role' property.
   */
  interface Session {
    user: {
      role: "Buyer" | "Seller";
      sellerId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT token to include the 'role' property.
   */
  interface JWT {
    role: "Buyer" | "Seller";
    sellerId: string;
  }
}
