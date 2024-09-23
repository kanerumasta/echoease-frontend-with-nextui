// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   if (!request.cookies.get("access")?.value)
//     return NextResponse.redirect(new URL("/auth/login", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['',"/bookings/:path*", "/messages/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // try {
  //   const res = await fetch("http://clients3.google.com/generate_204");
  //   if (!res.ok) {
  //     return NextResponse.redirect(new URL("/network-error", request.url));
  //   }
  // } catch (e) {
  //   console.log("ERROR catched");
  //   return NextResponse.redirect(new URL("/network-error", request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/auth/:path*"],
};
