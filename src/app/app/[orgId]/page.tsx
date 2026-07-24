import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function OrgDashboard({
  params,
}: {
  params: { orgId: string };
}) {
  const supabase = createClient();

  const { count: empCount } = await supabase
    .from("memberships")
    .select("id", { count: "exact", head: true })
    .eq("org_id", params.orgId)
    .eq("status", "active");

  const { count: shiftCount } = await supabase
    .from("shifts")
    .select("id", { count: "exact", head: true })
    .eq("org_id", params.orgId);

  const base = `/app/${params.orgId}`;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Oversigt</h1>
      <p className="text-[#46536a] mt-1 mb-6 text-sm">
        Velkommen til din arbejdsplads i Crewly.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
        <Link
          href={`${base}/medarbejdere`}
          className="bg-white border border-line rounded-2xl p-5 shadow-sm hover:border-brand transition"
        >
          <div className="text-3xl font-bold">{empCount ?? 0}</div>
          <div className="text-sm font-semibold mt-1">Medarbejdere</div>
          <div className="text-xs text-[#7a8598] mt-1">
            Se, opret og rediger dit team →
          </div>
        </Link>
        <Link
          href={`${base}/vagtplan`}
          className="bg-white border border-line rounded-2xl p-5 shadow-sm hover:border-brand transition"
        >
          <div className="text-3xl font-bold">{shiftCount ?? 0}</div>
          <div className="text-sm font-semibold mt-1">Vagter</div>
          <div className="text-xs text-[#7a8598] mt-1">
            Planlæg ugen og fordel vagter →
          </div>
        </Link>
      </div>
    </div>
  );
}
