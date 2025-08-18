// src/app/teams/[id]/page.tsx
import { currentNflSeasonYear, fetchRoster, fetchTeams } from "@/lib/espn";
import Image from "next/image";
import Link from "next/link";

type Params = { params: { id: string } };

export const revalidate = 0;

export default async function Page({ params }: Params) {
  const year = currentNflSeasonYear();
  const teams = await fetchTeams();
  const team = teams.find((t) => t.id === params.id);
  if (!team) {
    return (
      <main className="px-6 py-8 max-w-6xl mx-auto">
        <p className="text-red-400">Team nicht gefunden.</p>
        <Link href="/teams" className="underline">Zurück zur Teamliste</Link>
      </main>
    );
  }

  const roster = await fetchRoster(team.id, year);

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16">
          <Image src={team.logo} alt={`${team.display} logo`} fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{team.city} {team.name}</h1>
          <p className="text-slate-300">{team.abbr} · Season {year}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Roster ({roster.length})</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Pos</th>
                <th className="text-left px-4 py-2">Age</th>
                <th className="text-left px-4 py-2">Ht</th>
                <th className="text-left px-4 py-2">Wt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {roster.map((p) => (
                <tr key={p.id} className="bg-slate-900/60 hover:bg-slate-900">
                  <td className="px-4 py-2">{p.jersey || "-"}</td>
                  <td className="px-4 py-2">{p.fullName}</td>
                  <td className="px-4 py-2">{p.position || "-"}</td>
                  <td className="px-4 py-2">{p.age ?? "-"}</td>
                  <td className="px-4 py-2">{p.height ?? "-"}</td>
                  <td className="px-4 py-2">{p.weight ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Link href="/teams" className="underline">← Zurück zu Teams</Link>
    </main>
  );
}
