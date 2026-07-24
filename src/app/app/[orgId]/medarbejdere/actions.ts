"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PLANDAY_EMPLOYEES } from "@/lib/planday-seed";

function num(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").replace(",", ".").trim();
  if (!s) return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}
function str(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s ? s : null;
}

export async function createEmployee(orgId: string, formData: FormData) {
  const supabase = createClient();
  const first = str(formData.get("first_name"));
  const last = str(formData.get("last_name"));
  if (!first || !last)
    redirect(
      `/app/${orgId}/medarbejdere?error=` +
        encodeURIComponent("For- og efternavn skal udfyldes"),
    );

  const { error } = await supabase.from("memberships").insert({
    org_id: orgId,
    first_name: first,
    last_name: last,
    invited_email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    employee_number: str(formData.get("employee_number")),
    wage_group: str(formData.get("wage_group")),
    wage: num(formData.get("wage")),
    hired_date: str(formData.get("hired_date")),
    status: "active",
  });
  if (error)
    redirect(
      `/app/${orgId}/medarbejdere?error=` + encodeURIComponent(error.message),
    );
  revalidatePath(`/app/${orgId}/medarbejdere`);
  redirect(`/app/${orgId}/medarbejdere?ok=` + encodeURIComponent("Medarbejder oprettet"));
}

export async function updateEmployee(orgId: string, formData: FormData) {
  const supabase = createClient();
  const id = str(formData.get("id"));
  if (!id) redirect(`/app/${orgId}/medarbejdere`);
  const { error } = await supabase
    .from("memberships")
    .update({
      first_name: str(formData.get("first_name")),
      last_name: str(formData.get("last_name")),
      invited_email: str(formData.get("email")),
      phone: str(formData.get("phone")),
      employee_number: str(formData.get("employee_number")),
      wage_group: str(formData.get("wage_group")),
      wage: num(formData.get("wage")),
      hired_date: str(formData.get("hired_date")),
    })
    .eq("id", id);
  if (error)
    redirect(
      `/app/${orgId}/medarbejdere?error=` + encodeURIComponent(error.message),
    );
  revalidatePath(`/app/${orgId}/medarbejdere`);
  redirect(`/app/${orgId}/medarbejdere?ok=` + encodeURIComponent("Gemt"));
}

export async function deactivateEmployee(orgId: string, formData: FormData) {
  const supabase = createClient();
  const id = str(formData.get("id"));
  if (!id) redirect(`/app/${orgId}/medarbejdere`);
  const { error } = await supabase
    .from("memberships")
    .update({ status: "inactive" })
    .eq("id", id);
  if (error)
    redirect(
      `/app/${orgId}/medarbejdere?error=` + encodeURIComponent(error.message),
    );
  revalidatePath(`/app/${orgId}/medarbejdere`);
  redirect(`/app/${orgId}/medarbejdere?ok=` + encodeURIComponent("Medarbejder deaktiveret"));
}

// Importér de 33 fra Planday. Springer dem over der allerede findes (samme lønnummer eller email).
export async function importPlanday(orgId: string) {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("memberships")
    .select("employee_number, invited_email")
    .eq("org_id", orgId);

  const haveNum = new Set(
    (existing ?? []).map((r: any) => (r.employee_number || "").trim()).filter(Boolean),
  );
  const haveEmail = new Set(
    (existing ?? []).map((r: any) => (r.invited_email || "").toLowerCase()).filter(Boolean),
  );

  const rows = PLANDAY_EMPLOYEES.filter(
    (e) =>
      !haveNum.has(e.employee_number) &&
      !haveEmail.has(e.email.toLowerCase()),
  ).map((e) => ({
    org_id: orgId,
    first_name: e.first_name,
    last_name: e.last_name,
    invited_email: e.email,
    phone: e.phone,
    employee_number: e.employee_number,
    wage_group: e.wage_group,
    hired_date: e.hired_date,
    status: "active",
  }));

  if (rows.length === 0) {
    redirect(
      `/app/${orgId}/medarbejdere?ok=` +
        encodeURIComponent("Alle Planday-medarbejdere er allerede oprettet"),
    );
  }

  const { error } = await supabase.from("memberships").insert(rows);
  if (error)
    redirect(
      `/app/${orgId}/medarbejdere?error=` + encodeURIComponent(error.message),
    );
  revalidatePath(`/app/${orgId}/medarbejdere`);
  redirect(
    `/app/${orgId}/medarbejdere?ok=` +
      encodeURIComponent(`${rows.length} medarbejdere importeret fra Planday`),
  );
}
