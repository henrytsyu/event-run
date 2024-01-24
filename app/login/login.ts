"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<boolean> => {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return true;
  } else {
    return redirect("/");
  }
};
