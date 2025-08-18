// src/pages/Dashboard.tsx
import React from "react";
import Layout from "../components/Layout";
import { fetchTodayScoreboard } from "../lib/espn";

export default function Dashboard() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updated, setUpdated] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodayScoreboard();
        setEvents(data?.events ?? []);
        setUpdated(new Date());
      } catch (e: any) {
        setError(e?.message || "Failed to load scoreboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">Welcome to NFL Analytics</h1>
      <p className="text-slate-300 mb-6">Your ultimate destination for NFL insights, predictions, and statistics.</p>

      <div className="mb-4 text-sm">
        {updated ? (
          <span className="px-2 py-1 rounded bg-emerald-900/40 text-emerald-300">
            Live Data · Updated {updated.toLocaleTimeString()}
          </span>
        ) : (
          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">Refreshing…</span>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-3">Today's Games</h2>
      {loading && <div className="text-slate-300">Loading…</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && events.length === 0 && (
        <div className="text-slate-300">No games scheduled today.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((e) => {
          const c = e.competitions?.[0];
          const home = c?.competitors?.find((x: any) => x.homeAway === "home");
          const away = c?.competitors?.find((x: any) => x.homeAway === "away");
          const status = e.status?.type?.shortDetail || "";
          return (
            <div key={e.id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                <span>{status}</span>
                <span>{new Date(e.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="font-semibold truncate">{away?.team?.displayName}</div>
                  <div className="text-2xl">{away?.score ?? "-"}</div>
                </div>
                <div className="text-slate-500 px-2">@</div>
                <div className="flex-1 pl-2 text-right">
                  <div className="font-semibold truncate">{home?.team?.displayName}</div>
                  <div className="text-2xl">{home?.score ?? "-"}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400">{c?.venue?.fullName}</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
