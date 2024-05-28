import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookies } from "../lib/CookiStore";
import next from "next/types";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middlware called");

  // console.log("hello");
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;

  // if (isAuthenticated == "true") {
  //   console.log("authenticated", isAuthenticated);

  //   return NextResponse.redirect(new URL("/mail/inbox", request.url));
  // }
  // if (!isAuthenticated || isAuthenticated == "false") {
  //   console.log("not authenticated", isAuthenticated);
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  if (
    request.nextUrl.pathname == "/auth/login" ||
    request.nextUrl.pathname == "/"
  ) {
    if (isAuthenticated == "true") {
      console.log("authenticated", isAuthenticated);

      return NextResponse.redirect(new URL("/mail/inbox", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
