import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookies } from "../lib/CookiStore";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middlware called");

  // console.log("hello");
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  // console.log("access token from middleware", isAuthenticated);
  if (isAuthenticated) {
    // console.log("true true");

    return NextResponse.redirect(new URL("/mail/inbox", request.url));
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/mail"],
};
