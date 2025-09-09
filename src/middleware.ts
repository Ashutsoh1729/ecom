import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // The 'auth' function makes the user's session available on req.auth
  const userRole = req.auth?.user?.role;
  console.log("MIDDLEWARE CHECK: Role is", userRole);

  // Checking for user being a seller
  if (userRole === "Buyer") {
    // If they are a Buyer, we build a URL to the homepage and redirect them.
    return NextResponse.redirect(new URL("/", req.url));
  }
  // If the role is not "Buyer", we allow the request to continue to the dashboard.
  return NextResponse.next();
});

// This config will decide which route the middlware should run on
export const config = {
  matcher: ["/dashboard/:path*"], // all paths related to dashboard
};
