// src/pages/Games.tsx
import React from "react";
import Layout from "../components/Layout";
import { fetchTodayScoreboard } from "../lib/espn";

export default function Games() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodayScoreboard();
        setEvents(data?.events ?? []);
      } catch (e: any) {
        setError(e?.message || "Failed to load games");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Games (Today)</h1>

      {loading && <div className="text-slate-300">Loading…</div>}
      {error && <div className="text-red-400">{error}</div>}

      <div className="space-y-3">
        {events.map((e) => {
          const c = e.competitions?.[0];
          const home = c?.competitors?.find((x: any) => x.homeAway === "home");
          const away = c?.competitors?.find((x: any) => x.homeAway === "away");
          return (
            <div key={e.id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="text-slate-300 text-sm mb-1">{e.status?.type?.shortDetail}</div>
              <div className="flex justify-between">
                <div className="truncate">{away?.team?.displayName}</div>
                <div className="text-slate-500 px-2">@</div>
                <div className="truncate text-right">{home?.team?.displayName}</div>
              </div>
              <div className="text-xs text-slate-400 mt-2">{new Date(e.date).toLocaleString()} · {c?.venue?.fullName}</div>
            </div>
          );
        })}
        {!loading && !error && events.length === 0 && (
          <div className="text-slate-300">No games today.</div>
        )}
      </div>
    </Layout>
  );
}
