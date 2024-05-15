import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import store from "./app/reduxToolKit/store";
import { useSelector } from "react-redux";
import { getAuthCookies } from "../lib/CookiStore";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("hello");
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  console.log("access token from middleware", isAuthenticated);
  if (isAuthenticated == "true" || isAuthenticated) {
    console.log("true true");

    return NextResponse.redirect(new URL("/mail/inbox", request.url));
  }
  if (isAuthenticated == "false" || !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // const isauth:any = store.getState().user.isAuthenticated; | request.cookies.get('')
  // console.log(isauth);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
