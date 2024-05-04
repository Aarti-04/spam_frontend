import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import store from "./app/reduxToolKit/store";
import { useSelector } from "react-redux";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("hello");
  // const isauth:any = store.getState().user.isAuthenticated; | request.cookies.get('')
  // console.log(isauth);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/pages/login",
};
