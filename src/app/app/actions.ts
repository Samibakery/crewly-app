"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseCutDay(formData: FormData): number | null {
  const type = String(formData.get("pay_period") || "maaned");
  if (type !== "cut") return null;
  const raw = parseInt(String(formData.get("cut_day") || ""), 10);
  if (isNaN(raw)) return 21;
  return Math.min(28, Math.max(1, raw));
}

export async function createOrg(formData: FormData) {
  const supabase = createClient();
  const name = String(formData.get("name") || "").trim();
  const pp = String(formData.get("pay_period") || "maaned");
  const cut = parseCutDay(formData);
  if (!name)
    redirect("/app?error=" + encodeURIComponent("Skriv et virksomhedsnavn"));
  const { error } = await supabase.rpc("create_organisation", {
    org_name: name,
    pp_type: pp,
    pp_cut: cut,
  });
  if (error) redirect("/app?error=" + encodeURIComponent(error.message));
  revalidatePath("/app");
  redirect("/app");
}

export async function updatePayPeriod(formData: FormData) {
  const supabase = createClient();
  const orgId = String(formData.get("org_id") || "");
  const pp = String(formData.get("pay_period") || "maaned");
  const cut = parseCutDay(formData);
  if (!orgId)
    redirect("/app?error=" + encodeURIComponent("Manglende virksomheds-id"));
  const { error } = await supabase
    .from("organisations")
    .update({ pay_period_type: pp, pay_period_cutoff_day: cut })
    .eq("id", orgId);
  if (error) redirect("/app?error=" + encodeURIComponent(error.message));
  revalidatePath("/app");
  redirect("/app?ok=" + encodeURIComponent("Lønperiode opdateret"));
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
