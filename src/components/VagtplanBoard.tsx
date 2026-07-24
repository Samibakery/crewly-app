"use client";

import { useState } from "react";
import Link from "next/link";
import { createShift, updateShift, deleteShift } from "@/app/app/[orgId]/vagtplan/actions";

type Shift = {
  id: string;
  membership_id: string | null;
  shift_date: string;
  start_time: string | null;
  end_time: string | null;
  note: string | null;
  break_minutes: number | null;
  status: string | null;
};
type Emp = { id: string; first_name: string | null; last_name: string | null };

const DAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function dm(dateIso: string) {
  const [, m, d] = dateIso.split("-");
  return `${parseInt(d, 10)}. ${MONTHS[parseInt(m, 10) - 1]}`;
}
function hhmm(t: string | null) {
  return t ? t.slice(0, 5) : "";
}

export function VagtplanBoard({
  orgId,
  weekStart,
  prevWeek,
  nextWeek,
  days,
  shifts,
  employees,
  ok,
  error,
}: {
  orgId: string;
  weekStart: string;
  prevWeek: string;
  nextWeek: string;
  days: string[];
  shifts: Shift[];
  employees: Emp[];
  ok?: string;
  error?: string;
}) {
  const [modal, setModal] = useState<
    { mode: "create"; date: string } | { mode: "edit"; shift: Shift } | null
  >(null);

  const nameOf = (id: string | null) => {
    if (!id) return "Ledig vagt";
    const e = employees.find((x) => x.id === id);
    return e ? `${e.first_name ?? ""} ${e.last_name ?? ""}`.trim() : "Ukendt";
  };
  const base = `/app/${orgId}/vagtplan`;

  const inp =
    "w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <h1 className="text-2xl font-bold tracking-tight">Vagtplan</h1>
        <div className="flex items-center gap-1 ml-auto">
          <Link href={`${base}?start=${prevWeek}`} className="px-2 py-1.5 rounded-lg border border-line bg-white text-sm hover:border-brand">←</Link>
          <Link href={base} className="px-3 py-1.5 rounded-lg border border-line bg-white text-sm font-semibold hover:border-brand">I dag</Link>
          <Link href={`${base}?start=${nextWeek}`} className="px-2 py-1.5 rounded-lg border border-line bg-white text-sm hover:border-brand">→</Link>
        </div>
      </div>
      <p className="text-[#46536a] mt-1 mb-4 text-sm">
        Uge fra {dm(days[0])} til {dm(days[6])}. Klik på en dag for at lægge en vagt ind.
      </p>

      {ok && <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg p-3">{ok}</div>}
      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {days.map((date, i) => {
          const dayShifts = shifts.filter((s) => s.shift_date === date);
          return (
            <div key={date} className="bg-white border border-line rounded-xl p-2 min-h-[140px] flex flex-col">
              <div className="flex items-center justify-between px-1 mb-2">
                <div>
                  <div className="text-xs font-bold">{DAYS[i]}</div>
                  <div className="text-[11px] text-[#7a8598]">{dm(date)}</div>
                </div>
                <button
                  onClick={() => setModal({ mode: "create", date })}
                  className="w-6 h-6 rounded-md bg-brand/10 text-brand-ink font-bold grid place-items-center hover:bg-brand/20"
                  title="Tilføj vagt"
                >
                  +
                </button>
              </div>
              <div className="space-y-1.5 flex-1">
                {dayShifts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setModal({ mode: "edit", shift: s })}
                    className={
                      "w-full text-left rounded-lg px-2 py-1.5 text-xs border transition " +
                      (s.membership_id
                        ? "bg-brand/5 border-brand/20 hover:border-brand"
                        : "bg-amber-50 border-amber-200 hover:border-amber-400")
                    }
                  >
                    <div className="font-semibold">
                      {hhmm(s.start_time)}–{hhmm(s.end_time)}
                    </div>
                    <div className="text-[#46536a] truncate">{nameOf(s.membership_id)}</div>
                    {s.note ? <div className="text-[#9aa6b6] truncate">{s.note}</div> : null}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center z-20 p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <div className="font-semibold mb-3">
              {modal.mode === "create" ? "Ny vagt" : "Rediger vagt"}
            </div>
            <form action={modal.mode === "create" ? createShift.bind(null, orgId) : updateShift.bind(null, orgId)}>
              <input type="hidden" name="week" value={weekStart} />
              {modal.mode === "edit" && <input type="hidden" name="id" value={modal.shift.id} />}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Dato</label>
                  <input type="date" name="shift_date" required className={inp}
                    defaultValue={modal.mode === "create" ? modal.date : modal.shift.shift_date} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Start</label>
                    <input type="time" name="start_time" required className={inp}
                      defaultValue={modal.mode === "edit" ? hhmm(modal.shift.start_time) : "06:00"} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Slut</label>
                    <input type="time" name="end_time" required className={inp}
                      defaultValue={modal.mode === "edit" ? hhmm(modal.shift.end_time) : "14:00"} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Medarbejder</label>
                  <select name="membership_id" className={inp}
                    defaultValue={modal.mode === "edit" ? (modal.shift.membership_id ?? "") : ""}>
                    <option value="">Ledig vagt (ingen)</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {`${e.first_name ?? ""} ${e.last_name ?? ""}`.trim() || "Uden navn"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Pause (min)</label>
                    <input type="number" name="break_minutes" min={0} className={inp}
                      defaultValue={modal.mode === "edit" ? (modal.shift.break_minutes ?? 0) : 0} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Note</label>
                  <input name="note" className={inp}
                    defaultValue={modal.mode === "edit" ? (modal.shift.note ?? "") : ""} placeholder="fx morgenhold" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-lg px-4 py-2 text-sm">
                  {modal.mode === "create" ? "Opret vagt" : "Gem"}
                </button>
                <button type="button" onClick={() => setModal(null)} className="text-sm font-semibold text-[#7a8598] px-2">
                  Annullér
                </button>
                <span className="ml-auto" />
              </div>
            </form>
            {modal.mode === "edit" && (
              <form action={deleteShift.bind(null, orgId)} className="mt-2 pt-2 border-t border-line">
                <input type="hidden" name="week" value={weekStart} />
                <input type="hidden" name="id" value={modal.shift.id} />
                <button className="text-xs font-semibold text-red-500 hover:underline">Slet vagt</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
