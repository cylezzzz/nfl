// src/app/page.tsx
import { fetchTodayScoreboard } from "@/lib/espn";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const data = await fetchTodayScoreboard();
  const events: any[] = data?.events ?? [];

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Heutige Spiele & Live-Scores</h1>

      {events.length === 0 ? (
        <p className="text-slate-300">Heute stehen keine Spiele an.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e) => {
            const c = e.competitions?.[0];
            const home = c?.competitors?.find((x: any) => x.homeAway === "home");
            const away = c?.competitors?.find((x: any) => x.homeAway === "away");
            const status = e.status?.type?.shortDetail || "";
            return (
              <div key={e.id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="text-sm text-slate-400 mb-2">{status}</div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    <div className="font-semibold">{away?.team?.displayName}</div>
                    <div className="text-2xl">{away?.score ?? "-"}</div>
                  </div>
                  <div className="text-slate-500 px-2">@</div>
                  <div className="flex-1 pl-2 text-right">
                    <div className="font-semibold">{home?.team?.displayName}</div>
                    <div className="text-2xl">{home?.score ?? "-"}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  {c?.venue?.fullName} · {new Date(e.date).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <Link href="/teams" className="underline">Zu den Teams →</Link>
      </div>
    </main>
  );
}
