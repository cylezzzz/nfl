// src/app/teams/page.tsx
import { fetchTeams } from "@/lib/espn";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0; // immer frisch

export default async function Page() {
  const teams = await fetchTeams();

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NFL Teams</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/teams/${t.id}`}
            className="group rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-4 flex items-center gap-3 transition"
          >
            <div className="relative w-12 h-12">
              <Image
                src={t.logo}
                alt={`${t.display} logo`}
                fill
                className="object-contain"
                sizes="48px"
                onError={(e) => {
                  // Fallback auf ESPN-Logo, wenn lokales fehlt
                  (e.target as HTMLImageElement).src = `https://a.espncdn.com/i/teamlogos/nfl/500/${t.abbr.toLowerCase()}.png`;
                }}
              />
            </div>
            <div>
              <div className="text-white font-semibold leading-tight">
                {t.city} {t.name}
              </div>
              <div className="text-xs text-slate-300">{t.abbr}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
