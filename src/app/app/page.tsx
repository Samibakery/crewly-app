import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { PayPeriodPicker } from "@/components/PayPeriodPicker";
import { OrgPayPeriodEditor } from "@/components/OrgPayPeriodEditor";
import { createOrg, signOut } from "./actions";

function first<T>(v: T | T[] | null | undefined): T | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return (v as T) ?? null;
}

export default async function AppPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: rows } = await supabase
    .from("memberships")
    .select(
      "id, organisations(id, name, pay_period_type, pay_period_cutoff_day), roles(is_superadmin, permissions)",
    )
    .eq("user_id", user.id);

  const orgs = (rows ?? []).map((r: any) => {
    const org = first<any>(r.organisations);
    const role = first<any>(r.roles);
    const canEdit =
      !!role?.is_superadmin ||
      (Array.isArray(role?.permissions) &&
        role.permissions.includes("sys.settings"));
    return {
      id: (org?.id as string) ?? "",
      name: (org?.name as string) ?? "Uden navn",
      ppType: (org?.pay_period_type as string) ?? "maaned",
      cutDay: (org?.pay_period_cutoff_day as number | null) ?? null,
      canEdit,
    };
  });

  return (
    <main className="min-h-screen">
      <header className="bg-white border-b border-line">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center gap-3">
          <Logo size={18} />
          <span className="font-bold text-lg tracking-tight">
            Crew<span className="text-brand">ly</span>
          </span>
          <form action={signOut} className="ml-auto">
            <button className="text-sm font-semibold text-[#7a8598] hover:text-ink">
              Log ud
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {searchParams.error && (
          <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {searchParams.error}
          </div>
        )}
        {searchParams.ok && (
          <div className="mb-5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            {searchParams.ok}
          </div>
        )}

        {orgs.length === 0 ? (
          <section className="max-w-md">
            <h1 className="text-2xl font-bold tracking-tight">
              Opret din virksomhed
            </h1>
            <p className="text-[#46536a] mt-2 mb-6 text-sm">
              Din virksomhed er din base i Crewly. Du bliver Superadmin.
            </p>
            <form
              action={createOrg}
              className="bg-white border border-line rounded-2xl p-6 space-y-3 shadow-sm"
            >
              <label className="block text-sm font-semibold">
                Virksomhedens navn
              </label>
              <input
                name="name"
                required
                placeholder="fx Bakery by Hermann"
                className="w-full border border-line rounded-xl px-3 py-3 text-sm outline-none focus:border-brand"
              />
              <PayPeriodPicker />
              <button className="w-full bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-xl py-3 text-sm mt-2">
                Opret virksomhed
              </button>
            </form>
          </section>
        ) : (
          <section>
            <h1 className="text-2xl font-bold tracking-tight">
              Vælg arbejdsplads
            </h1>
            <p className="text-[#46536a] mt-2 mb-6 text-sm">
              Du er logget ind som {user.email}.
            </p>
            <div className="space-y-3 max-w-md">
              {orgs.map((o) => (
                <div
                  key={o.id}
                  className="bg-white border border-line rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-11 h-11 rounded-xl grid place-items-center text-white font-bold"
                      style={{ background: "#3B76D1" }}
                    >
                      {o.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold">{o.name}</div>
                      <div className="text-xs text-[#7a8598]">
                        Din arbejdsplads
                      </div>
                    </div>
                  </div>
                  <OrgPayPeriodEditor
                    orgId={o.id}
                    type={o.ppType}
                    cutDay={o.cutDay}
                    canEdit={o.canEdit}
                  />
                </div>
              ))}
            </div>
            <form
              action={createOrg}
              className="mt-6 max-w-md bg-white border border-line rounded-2xl p-4 shadow-sm space-y-3"
            >
              <div className="text-sm font-semibold">
                Tilføj en virksomhed mere
              </div>
              <input
                name="name"
                required
                placeholder="Virksomhedsnavn"
                className="w-full border border-line rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
              <PayPeriodPicker />
              <button className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-xl px-4 py-2.5 text-sm">
                Opret virksomhed
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
