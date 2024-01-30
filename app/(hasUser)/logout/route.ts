import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const supabase = createClient(cookies());
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login", request.url));
}
