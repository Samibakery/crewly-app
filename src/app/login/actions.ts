"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) redirect("/login?error=" + encodeURIComponent(error.message));
  revalidatePath("/", "layout");
  redirect("/app");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: {
      data: { full_name: String(formData.get("full_name") || "") },
    },
  });
  if (error)
    redirect("/login?mode=signup&error=" + encodeURIComponent(error.message));
  revalidatePath("/", "layout");
  redirect("/app");
}
