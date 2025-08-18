// src/pages/Stats.tsx
import React from "react";
import Layout from "../components/Layout";
import { currentNflSeasonYear, fetchLeaders } from "../lib/espn";

type Row = { rank: number; name: string; team?: string; stat?: number; extra?: any };

async function getCategory(category: string) {
  const year = currentNflSeasonYear();
  const json = await fetchLeaders(year, category);
  // Struktur variiert. Wir extrahieren die Top 10 generisch:
  const cats = json?.categories ?? [];
  const first = cats[0];
  const leaders = first?.leaders?.[0]?.leaders ?? [];
  const rows: Row[] = leaders.slice(0, 10).map((l: any, idx: number) => ({
    rank: idx + 1,
    name: l?.athlete?.displayName,
    team: l?.team?.abbreviation,
    stat: l?.statValue ?? l?.value ?? l?.displayValue,
  }));
  return rows;
}

export default function Stats() {
  const [pass, setPass] = React.useState<Row[]>([]);
  const [rush, setRush] = React.useState<Row[]>([]);
  const [recv, setRecv] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const [p, r, rc] = await Promise.all([
          getCategory("passingYards"),
          getCategory("rushingYards"),
          getCategory("receivingYards"),
        ]);
        setPass(p); setRush(r); setRecv(rc);
      } catch (e: any) {
        setError(e?.message || "Failed to load leaders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Board = ({ title, rows }: { title: string; rows: Row[] }) => (
    <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-slate-200">
            <tr>
              <th className="text-left px-3 py-2">Rank</th>
              <th className="text-left px-3 py-2">Player</th>
              <th className="text-left px-3 py-2">Team</th>
              <th className="text-right px-3 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((r) => (
              <tr key={`${title}-${r.rank}`} className="bg-slate-900/60 hover:bg-slate-900">
                <td className="px-3 py-2">{r.rank}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.team ?? "-"}</td>
                <td className="px-3 py-2 text-right">{r.stat ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Season Leaders ({currentNflSeasonYear()})</h1>
      {loading && <div className="text-slate-300">Loading leaders…</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4">
          <Board title="Passing Yards Leaders" rows={pass} />
          <Board title="Rushing Yards Leaders" rows={rush} />
          <Board title="Receiving Yards Leaders" rows={recv} />
        </div>
      )}
    </Layout>
  );
}
