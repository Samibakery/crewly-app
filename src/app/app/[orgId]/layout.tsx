import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { signOut } from "../actions";
import { OrgNav } from "@/components/OrgNav";

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS sikrer at man kun kan læse org man er medlem af
  const { data: org } = await supabase
    .from("organisations")
    .select("id, name")
    .eq("id", params.orgId)
    .maybeSingle();

  if (!org) redirect("/app");

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="bg-white border-b border-line sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/app" className="flex items-center gap-2 shrink-0">
            <Logo size={18} />
            <span className="font-bold tracking-tight hidden sm:inline">
              Crew<span className="text-brand">ly</span>
            </span>
          </Link>
          <span className="text-[#c7d0dd]">/</span>
          <span className="font-semibold text-sm truncate">{org.name}</span>
          <OrgNav orgId={org.id} />
          <form action={signOut} className="ml-auto shrink-0">
            <button className="text-sm font-semibold text-[#7a8598] hover:text-ink">
              Log ud
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
