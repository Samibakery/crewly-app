"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function OrgNav({ orgId }: { orgId: string }) {
  const pathname = usePathname();
  const base = `/app/${orgId}`;
  const items = [
    { href: base, label: "Oversigt" },
    { href: `${base}/medarbejdere`, label: "Medarbejdere" },
    { href: `${base}/vagtplan`, label: "Vagtplan" },
  ];
  return (
    <nav className="flex items-center gap-1 ml-2 overflow-x-auto">
      {items.map((it) => {
        const active =
          it.href === base ? pathname === base : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={
              "px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition " +
              (active
                ? "bg-brand/10 text-brand-ink"
                : "text-[#5a6576] hover:bg-[#eef2f7]")
            }
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
