import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !user &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
