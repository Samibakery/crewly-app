import { createClient } from "@/lib/supabase/server";
import { VagtplanBoard } from "@/components/VagtplanBoard";

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function addDays(dateIso: string, n: number): string {
  const d = new Date(dateIso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}
// Mandag i ugen for en given dato (eller i dag)
function mondayOf(dateIso: string): string {
  const d = new Date(dateIso + "T00:00:00Z");
  const day = d.getUTCDay(); // 0=søn..6=lør
  const offset = (day + 6) % 7; // 0 for mandag
  d.setUTCDate(d.getUTCDate() - offset);
  return iso(d);
}

export default async function VagtplanPage({
  params,
  searchParams,
}: {
  params: { orgId: string };
  searchParams: { start?: string; ok?: string; error?: string };
}) {
  const supabase = createClient();

  const todayIso = new Date().toISOString().slice(0, 10);
  const weekStart = mondayOf(searchParams.start || todayIso);
  const weekEnd = addDays(weekStart, 6);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const [{ data: shifts }, { data: emps }] = await Promise.all([
    supabase
      .from("shifts")
      .select(
        "id, membership_id, shift_date, start_time, end_time, note, break_minutes, status",
      )
      .eq("org_id", params.orgId)
      .gte("shift_date", weekStart)
      .lte("shift_date", weekEnd)
      .order("start_time", { ascending: true }),
    supabase
      .from("memberships")
      .select("id, first_name, last_name")
      .eq("org_id", params.orgId)
      .eq("status", "active")
      .order("first_name", { ascending: true }),
  ]);

  return (
    <VagtplanBoard
      orgId={params.orgId}
      weekStart={weekStart}
      prevWeek={addDays(weekStart, -7)}
      nextWeek={addDays(weekStart, 7)}
      days={days}
      shifts={(shifts ?? []) as any}
      employees={(emps ?? []) as any}
      ok={searchParams.ok}
      error={searchParams.error}
    />
  );
}
