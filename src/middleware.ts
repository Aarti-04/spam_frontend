import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
  // export const config = {
  //   matcher: ['/profile', '/auth/login', '/mail/:path*'],
  // };
}
// // import { getAuthCookies } from "../lib/CookiStore";

// // // This function can be marked `async` if using `await` inside
// // export function middleware(request: NextRequest) {
// //   console.log("middlware called");

// //   // console.log("hello");
// //   const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
// //   console.log("access token from middleware", isAuthenticated);
// //   // if (isAuthenticated) {
// //   //   // console.log("true true");

// //   //   return NextResponse.redirect(new URL("/mail/inbox", request.url));
// //   // }
// //   if (!isAuthenticated) {
// //     return NextResponse.redirect(new URL("/auth/login", request.url));
// //   }
// //   return NextResponse.next();
// // }

// // // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: ["/*"],
// // };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getAuthCookies } from '../lib/CookiStore';
// // roles are as
// /*
//   1 : admin,
//   2 : tutor,
//   3 : user
// */
// export async function middleware(request: NextRequest) {
//   console.log('middleware called');

//   // const accessToken = request.cookies.get('token')?.value;

//   const isAuthenticated = getAuthCookies('isAuthenticated')
//     ? getAuthCookies('isAuthenticated')
//     : null;
//   const { pathname } = request.nextUrl;
//   console.log(pathname);
//   console.log(isAuthenticated);

//   // const adminPaths = pathname.startsWith('/admin');
//   // const tutorPaths = pathname.startsWith('/partner');

//   // login paths that should be allowed to access
//   // const adminLoginPath = pathname === '/admin/login';
//   const userLoginPAth = pathname === '/auth/login';
//   console.log(userLoginPAth);

//   // allow access of user login page
//   // if (userLoginPAth) {
//   //   return NextResponse.next();
//   // }

//   // console.log('token role ', tokenData?.role);
//   // if (pathname === '/admin/index') {
//   //   if (tokenData?.role === 1) {
//   //     return NextResponse.next();
//   //   }
//   // }

//   // if (adminPaths) {
//   //   if (tokenData?.role == 1) {
//   //     return NextResponse.next();
//   //   } else {
//   //     return NextResponse.redirect(new URL('/login', request.url));
//   //   }
//   // }

//   if (userLoginPAth) {
//     if (isAuthenticated == 'true') {
//       console.log('authenticated');

//       return NextResponse.next();
//     } else {
//       console.log('not authentciated userLoginPAth', userLoginPAth);
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }

//   const LoggedInUserNotAccessPaths =
//     request.nextUrl.pathname === '/auth/login' ||
//     request.nextUrl.pathname === '/register';
//   if (LoggedInUserNotAccessPaths) {
//     if (isAuthenticated) {
//       console.log('LoggedInUserNotAccessPaths');

//       return NextResponse.next();
//     }
//   } else {
//     if (!isAuthenticated) {
//       console.log('not token so login again');
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }
// }

// // Paths were middleware should be apply to check
// export const config = {
//   matcher: ['/profile', '/auth/login', '/mail/:path*'],
// };
