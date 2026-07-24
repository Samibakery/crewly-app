import Link from "next/link";
import { Logo } from "@/components/Logo";
import { signIn, signUp } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { mode?: string; error?: string };
}) {
  const signup = searchParams.mode === "signup";
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-line shadow-xl p-7">
        <div className="flex items-center gap-2 justify-center mb-1">
          <Logo />
          <span className="text-2xl font-bold tracking-tight">
            Crew<span className="text-brand">ly</span>
          </span>
        </div>
        <p className="text-center text-sm text-[#7a8598] mb-5">
          {signup ? "Opret din konto" : "Log ind på din arbejdsplads"}
        </p>

        {searchParams.error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {searchParams.error}
          </div>
        )}

        <form action={signup ? signUp : signIn} className="space-y-3">
          {signup && (
            <input
              name="full_name"
              placeholder="Fulde navn"
              className="w-full border border-line rounded-xl px-3 py-3 text-sm outline-none focus:border-brand"
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder="navn@email.dk"
            className="w-full border border-line rounded-xl px-3 py-3 text-sm outline-none focus:border-brand"
          />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Adgangskode"
            className="w-full border border-line rounded-xl px-3 py-3 text-sm outline-none focus:border-brand"
          />
          <button className="w-full bg-brand hover:bg-brand-dark transition text-white font-semibold rounded-xl py-3 text-sm">
            {signup ? "Opret konto" : "Log ind"}
          </button>
        </form>

        <p className="text-center text-sm text-[#7a8598] mt-4">
          {signup ? (
            <>
              Har du en konto?{" "}
              <Link className="text-brand-ink font-semibold" href="/login">
                Log ind
              </Link>
            </>
          ) : (
            <>
              Ny hos Crewly?{" "}
              <Link
                className="text-brand-ink font-semibold"
                href="/login?mode=signup"
              >
                Opret konto
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
