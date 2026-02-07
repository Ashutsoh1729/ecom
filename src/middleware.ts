import NextAuth from "next-auth";
// import { auth } from "./auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(() => {
  return NextResponse.next();
});

export const config = {
  // Matcher ignoring _next/static, _next/image, favicon.ico, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
