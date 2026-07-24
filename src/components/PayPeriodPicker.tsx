"use client";

import { useState } from "react";

const TYPES = [
  { value: "maaned", label: "Månedlig · kalendermåned" },
  { value: "cut", label: "Månedlig · skæringsdato" },
  { value: "14", label: "14-dages" },
  { value: "uge", label: "Ugentlig" },
];

// Beskriver hvornår perioden løber, ud fra én skæringsdag.
// Perioden starter på skæringsdagen og slutter dagen før i næste måned.
function rangeText(day: number) {
  const start = Math.min(28, Math.max(1, day || 1));
  const end = start === 1 ? 31 : start - 1;
  if (start === 1) {
    return "Lønperioden følger kalendermåneden (den 1. til månedens sidste dag).";
  }
  return `Lønperioden kører fra den ${start}. i måneden til den ${end}. i den efterfølgende måned.`;
}

export function PayPeriodPicker({
  defaultType = "maaned",
  defaultCutDay = 21,
  namePrefix = "",
}: {
  defaultType?: string;
  defaultCutDay?: number;
  namePrefix?: string;
}) {
  const [type, setType] = useState(defaultType);
  const [cutDay, setCutDay] = useState<number>(defaultCutDay || 21);

  const typeName = namePrefix ? `${namePrefix}pay_period` : "pay_period";
  const cutName = namePrefix ? `${namePrefix}cut_day` : "cut_day";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">Lønperiode</label>
      <select
        name={typeName}
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border border-line rounded-xl px-3 py-3 text-sm outline-none focus:border-brand bg-white"
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {type === "cut" && (
        <div className="rounded-xl border border-line bg-[#f7f9fc] p-3 space-y-2">
          <label className="block text-sm font-semibold">
            Skæringsdag i måneden
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#46536a]">Fra den</span>
            <input
              type="number"
              min={1}
              max={28}
              name={cutName}
              value={cutDay}
              onChange={(e) => setCutDay(parseInt(e.target.value || "1", 10))}
              className="w-20 border border-line rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-brand bg-white"
            />
            <span className="text-sm text-[#46536a]">. i måneden</span>
          </div>
          <p className="text-xs text-[#46536a]">{rangeText(cutDay)}</p>
        </div>
      )}

      {/* Sørg for at cut_day altid sendes med (også når feltet er skjult),
          så serveren kan gemme den hvis typen er 'cut'. */}
      {type !== "cut" && (
        <input type="hidden" name={cutName} value={cutDay} />
      )}
    </div>
  );
}
