"use client";

import { useState } from "react";
import { PayPeriodPicker } from "./PayPeriodPicker";
import { updatePayPeriod } from "@/app/app/actions";

function label(type: string, cutDay: number | null) {
  switch (type) {
    case "cut":
      return `Månedlig · skæring den ${cutDay ?? 21}.`;
    case "14":
      return "14-dages";
    case "uge":
      return "Ugentlig";
    default:
      return "Månedlig · kalendermåned";
  }
}

export function OrgPayPeriodEditor({
  orgId,
  type,
  cutDay,
  canEdit,
}: {
  orgId: string;
  type: string;
  cutDay: number | null;
  canEdit: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 pt-3 border-t border-line">
      {!open ? (
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-[#46536a]">
            <span className="font-semibold text-ink">Lønperiode:</span>{" "}
            {label(type, cutDay)}
          </div>
          {canEdit && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-xs font-semibold text-brand-ink hover:underline"
            >
              Rediger
            </button>
          )}
        </div>
      ) : (
        <form action={updatePayPeriod} className="space-y-3">
          <input type="hidden" name="org_id" value={orgId} />
          <PayPeriodPicker
            defaultType={type}
            defaultCutDay={cutDay ?? 21}
          />
          <div className="flex gap-2">
            <button className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-lg px-4 py-2 text-sm">
              Gem lønperiode
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-[#7a8598] px-2"
            >
              Annullér
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
