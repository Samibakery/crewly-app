import { createClient } from "@/lib/supabase/server";
import { EmployeeManager } from "@/components/EmployeeManager";

export default async function MedarbejderePage({
  params,
  searchParams,
}: {
  params: { orgId: string };
  searchParams: { ok?: string; error?: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from("memberships")
    .select(
      "id, first_name, last_name, invited_email, phone, employee_number, wage_group, wage, hired_date, status",
    )
    .eq("org_id", params.orgId)
    .eq("status", "active")
    .order("first_name", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1">
        <h1 className="text-2xl font-bold tracking-tight">Medarbejdere</h1>
      </div>
      <p className="text-[#46536a] mt-1 mb-5 text-sm">
        {(data ?? []).length} aktive medarbejdere.
      </p>

      {searchParams.ok && (
        <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          {searchParams.ok}
        </div>
      )}
      {searchParams.error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
          {searchParams.error}
        </div>
      )}

      <EmployeeManager orgId={params.orgId} employees={(data ?? []) as any} />
    </div>
  );
}
