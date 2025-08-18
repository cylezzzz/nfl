// src/pages/Teams.tsx
import React from "react";
import Layout from "../components/Layout";
import { fetchTeams, TeamBasic } from "../lib/espn";
import { Link } from "react-router-dom";

export default function Teams() {
  const [teams, setTeams] = React.useState<TeamBasic[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const list = await fetchTeams();
        setTeams(list);
      } catch (e: any) {
        setError(e?.message || "Failed to load teams");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-1">NFL Teams</h1>
      <p className="text-slate-300 mb-6">Explore all 32 NFL teams for the current season.</p>

      {loading && <div className="text-slate-300">Loading teams…</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((t) => (
            <Link
              key={t.id}
              to={`/teams/${t.id}`}
              className="rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-4 flex items-center gap-3 transition"
            >
              <img
                src={t.logo}
                alt={`${t.display} logo`}
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${t.abbr.toLowerCase()}.png`;
                }}
              />
              <div>
                <div className="font-semibold">{t.city} {t.name}</div>
                <div className="text-xs text-slate-300">{t.abbr}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
