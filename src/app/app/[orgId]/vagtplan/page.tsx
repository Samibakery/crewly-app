export default function VagtplanPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Vagtplan</h1>
      <p className="text-[#46536a] mt-1 mb-6 text-sm">
        Uge-visning med vagter er næste modul, jeg bygger.
      </p>
      <div className="bg-white border border-line rounded-2xl p-8 text-center shadow-sm max-w-2xl">
        <div className="text-4xl mb-2">🗓️</div>
        <div className="font-semibold">Vagtplanen er på vej</div>
        <div className="text-sm text-[#7a8598] mt-1">
          Her kommer uge-kalenderen, hvor du fordeler vagter til dine medarbejdere.
        </div>
      </div>
    </div>
  );
}
