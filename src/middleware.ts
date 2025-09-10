import NextAuth from "next-auth";
// import { auth } from "./auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Now, req.auth will be correctly populated without interfering with Server Actions
  const userRole = req.auth?.user?.role;
  console.log("MIDDLEWARE CHECK: Role is", userRole);

  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    if (!req.auth) {
      // Not logged in, redirect to login
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (req.auth.user.role === "Buyer") {
      // If they are a Buyer, redirect them from the dashboard.
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // If the role is not "Buyer" or the route is not a dashboard route, continue.
  return NextResponse.next();
});

// This config will decide which route the middlware should run on
export const config = {
  matcher: ["/dashboard/:path*"], // all paths related to dashboard
};
