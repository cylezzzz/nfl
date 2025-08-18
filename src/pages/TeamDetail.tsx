// src/pages/TeamDetail.tsx
import React from "react";
import Layout from "../components/Layout";
import { useParams, Link } from "react-router-dom";
import { currentNflSeasonYear, fetchRoster, fetchTeams, Athlete, TeamBasic } from "../lib/espn";

export default function TeamDetail() {
  const { id } = useParams();               // ESPN numeric id
  const [team, setTeam] = React.useState<TeamBasic | null>(null);
  const [roster, setRoster] = React.useState<Athlete[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const year = currentNflSeasonYear();

  React.useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const teams = await fetchTeams();
        const t = teams.find((x) => x.id === id) || null;
        setTeam(t);
        const r = await fetchRoster(id, year);
        setRoster(r);
      } catch (e: any) {
        setError(e?.message || "Failed to load team/roster");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, year]);

  return (
    <Layout>
      <Link to="/teams" className="text-slate-300 underline">← Back to Teams</Link>

      {loading && <div className="mt-4 text-slate-300">Loading roster…</div>}
      {error && <div className="mt-4 text-red-400">{error}</div>}

      {team && (
        <div className="mt-4 flex items-center gap-4">
          <img src={team.logo} alt={`${team.display} logo`} className="h-14 w-14 object-contain" />
          <div>
            <h1 className="text-2xl font-bold">{team.city} {team.name}</h1>
            <p className="text-slate-300">{team.abbr} · Season {year}</p>
          </div>
        </div>
      )}

      {!loading && roster.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Roster ({roster.length})</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th className="text-left px-4 py-2">#</th>
                  <th className="text-left px-4 py-2">Player</th>
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
      )}
    </Layout>
  );
}
