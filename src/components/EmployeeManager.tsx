"use client";

import { useState } from "react";
import {
  createEmployee,
  updateEmployee,
  deactivateEmployee,
  importPlanday,
} from "@/app/app/[orgId]/medarbejdere/actions";

type Emp = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  invited_email: string | null;
  phone: string | null;
  employee_number: string | null;
  wage_group: string | null;
  wage: number | null;
  hired_date: string | null;
};

function Fields({ e }: { e?: Emp }) {
  const inp =
    "w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand";
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-semibold mb-1">Fornavn *</label>
        <input name="first_name" required defaultValue={e?.first_name ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Efternavn *</label>
        <input name="last_name" required defaultValue={e?.last_name ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">E-mail</label>
        <input name="email" type="email" defaultValue={e?.invited_email ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Telefon</label>
        <input name="phone" defaultValue={e?.phone ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Lønnummer</label>
        <input name="employee_number" defaultValue={e?.employee_number ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Ansættelsesdato</label>
        <input name="hired_date" type="date" defaultValue={e?.hired_date ?? ""} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Løngruppe</label>
        <select name="wage_group" defaultValue={e?.wage_group ?? ""} className={inp}>
          <option value="">Ikke sat</option>
          <option value="over18">Over 18</option>
          <option value="under18">Under 18</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">
          Grundtimeløn (kr./t) <span className="text-[#9aa6b6]">— valgfri</span>
        </label>
        <input name="wage" inputMode="decimal" defaultValue={e?.wage ?? ""} className={inp} placeholder="fx 145" />
      </div>
    </div>
  );
}

function groupBadge(g: string | null) {
  if (g === "over18")
    return <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand/10 text-brand-ink font-semibold">Over 18</span>;
  if (g === "under18")
    return <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">Under 18</span>;
  return <span className="text-[11px] text-[#9aa6b6]">—</span>;
}

export function EmployeeManager({
  orgId,
  employees,
}: {
  orgId: string;
  employees: Emp[];
}) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => {
            setCreating((v) => !v);
            setEditingId(null);
          }}
          className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-lg px-4 py-2 text-sm"
        >
          + Opret medarbejder
        </button>
        <form action={importPlanday.bind(null, orgId)}>
          <button className="border border-line bg-white hover:border-brand transition font-semibold rounded-lg px-4 py-2 text-sm">
            Importér fra Planday
          </button>
        </form>
      </div>

      {creating && (
        <form
          action={createEmployee.bind(null, orgId)}
          className="bg-white border border-line rounded-2xl p-5 shadow-sm mb-5 max-w-2xl"
        >
          <div className="font-semibold mb-3">Ny medarbejder</div>
          <Fields />
          <div className="flex gap-2 mt-4">
            <button className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-lg px-4 py-2 text-sm">
              Opret
            </button>
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="text-sm font-semibold text-[#7a8598] px-2"
            >
              Annullér
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-line rounded-2xl shadow-sm overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#7a8598]">
            Ingen medarbejdere endnu. Opret en, eller importér fra Planday.
          </div>
        ) : (
          <div className="divide-y divide-line">
            {employees.map((e) => (
              <div key={e.id}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="w-9 h-9 rounded-lg grid place-items-center text-white text-xs font-bold shrink-0 bg-brand">
                    {(e.first_name?.[0] ?? "?").toUpperCase()}
                    {(e.last_name?.[0] ?? "").toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {e.first_name} {e.last_name}
                    </div>
                    <div className="text-xs text-[#7a8598] truncate">
                      {e.invited_email || "ingen e-mail"}
                      {e.phone ? " · " + e.phone : ""}
                    </div>
                  </div>
                  <div className="hidden md:block text-xs text-[#7a8598] w-24 shrink-0">
                    {e.employee_number ? "Nr. " + e.employee_number : ""}
                  </div>
                  <div className="hidden sm:block w-20 shrink-0">{groupBadge(e.wage_group)}</div>
                  <div className="hidden lg:block text-xs text-[#46536a] w-20 shrink-0 text-right">
                    {e.wage != null ? e.wage + " kr/t" : "—"}
                  </div>
                  <button
                    onClick={() => {
                      setEditingId(editingId === e.id ? null : e.id);
                      setCreating(false);
                    }}
                    className="text-xs font-semibold text-brand-ink hover:underline shrink-0"
                  >
                    {editingId === e.id ? "Luk" : "Rediger"}
                  </button>
                </div>

                {editingId === e.id && (
                  <div className="px-4 pb-4 pt-1 bg-[#f7f9fc]">
                    <form action={updateEmployee.bind(null, orgId)}>
                      <input type="hidden" name="id" value={e.id} />
                      <Fields e={e} />
                      <div className="flex items-center gap-2 mt-4">
                        <button className="bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-lg px-4 py-2 text-sm">
                          Gem
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-sm font-semibold text-[#7a8598] px-2"
                        >
                          Annullér
                        </button>
                        <span className="ml-auto" />
                      </div>
                    </form>
                    <form
                      action={deactivateEmployee.bind(null, orgId)}
                      className="mt-2"
                    >
                      <input type="hidden" name="id" value={e.id} />
                      <button className="text-xs font-semibold text-red-500 hover:underline">
                        Deaktivér medarbejder
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
