"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function str(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s ? s : null;
}

function back(orgId: string, week: string | null, msg?: string, err?: boolean) {
  const q = new URLSearchParams();
  if (week) q.set("start", week);
  if (msg) q.set(err ? "error" : "ok", msg);
  redirect(`/app/${orgId}/vagtplan?` + q.toString());
}

export async function createShift(orgId: string, formData: FormData) {
  const supabase = createClient();
  const week = str(formData.get("week"));
  const shift_date = str(formData.get("shift_date"));
  const start_time = str(formData.get("start_time"));
  const end_time = str(formData.get("end_time"));
  if (!shift_date || !start_time || !end_time)
    back(orgId, week, "Dato, start og slut skal udfyldes", true);

  const { error } = await supabase.from("shifts").insert({
    org_id: orgId,
    membership_id: str(formData.get("membership_id")),
    shift_date,
    start_time,
    end_time,
    note: str(formData.get("note")),
    break_minutes: parseInt(String(formData.get("break_minutes") || "0"), 10) || 0,
    status: "planlagt",
  });
  if (error) back(orgId, week, error.message, true);
  revalidatePath(`/app/${orgId}/vagtplan`);
  back(orgId, week, "Vagt oprettet");
}

export async function updateShift(orgId: string, formData: FormData) {
  const supabase = createClient();
  const week = str(formData.get("week"));
  const id = str(formData.get("id"));
  if (!id) back(orgId, week);
  const { error } = await supabase
    .from("shifts")
    .update({
      membership_id: str(formData.get("membership_id")),
      shift_date: str(formData.get("shift_date")),
      start_time: str(formData.get("start_time")),
      end_time: str(formData.get("end_time")),
      note: str(formData.get("note")),
      break_minutes:
        parseInt(String(formData.get("break_minutes") || "0"), 10) || 0,
    })
    .eq("id", id);
  if (error) back(orgId, week, error.message, true);
  revalidatePath(`/app/${orgId}/vagtplan`);
  back(orgId, week, "Vagt gemt");
}

export async function deleteShift(orgId: string, formData: FormData) {
  const supabase = createClient();
  const week = str(formData.get("week"));
  const id = str(formData.get("id"));
  if (!id) back(orgId, week);
  const { error } = await supabase.from("shifts").delete().eq("id", id);
  if (error) back(orgId, week, error.message, true);
  revalidatePath(`/app/${orgId}/vagtplan`);
  back(orgId, week, "Vagt slettet");
}
