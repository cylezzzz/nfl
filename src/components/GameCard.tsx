// src/components/GameCard.tsx
import React from "react";
import type { Game, Team } from "../types";

type Props = {
  game: Game;
  onClick?: () => void;
};

function TeamLogo({ team }: { team: Team }) {
  // Erwartet team.logo = "/teams/XXX.png" (lokal). Fallback: ESPN-CDN.
  const [src, setSrc] = React.useState<string>(team.logo || "");

  return (
    <img
      src={src}
      alt={`${team.city} ${team.name} logo`}
      className="h-10 w-10 object-contain"
      onError={() =>
        setSrc(`https://a.espncdn.com/i/teamlogos/nfl/500/${team.abbreviation.toLowerCase()}.png`)
      }
    />
  );
}

function formatDateTime(date: string | undefined, time: string | undefined) {
  if (!date && !time) return "";
  try {
    // Falls du getrennte Felder hast (z. B. "2025-01-14" + "20:00")
    const iso = date && time ? `${date}T${time}:00` : date || "";
    const d = iso ? new Date(iso) : undefined;
    return d ? d.toLocaleString() : `${date ?? ""} ${time ?? ""}`.trim();
  } catch {
    return `${date ?? ""} ${time ?? ""}`.trim();
  }
}

export default function GameCard({ game, onClick }: Props) {
  const {
    homeTeam,
    awayTeam,
    date,
    time,
    venue,
    status,
    homeScore,
    awayScore,
    winProbability,
  } = game;

  const homePct = winProbability?.home ?? 50;
  const awayPct = winProbability?.away ?? 50;

  return (
    <div
      className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:bg-slate-900 transition cursor-pointer"
      onClick={onClick}
      role="button"
    >
      {/* Status / Datum */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-slate-300">{status ?? "scheduled"}</span>
        <span className="text-slate-400">{formatDateTime(date as any, time as any)}</span>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center gap-4">
        {/* Away Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo team={awayTeam} />
          <div className="truncate">
            <div className="font-semibold text-white truncate">
              {awayTeam.city} {awayTeam.name}
            </div>
            <div className="text-slate-300 text-sm">{awayTeam.abbreviation}</div>
          </div>
          <div className="ml-auto text-2xl font-bold text-white">
            {typeof awayScore === "number" ? awayScore : "-"}
          </div>
        </div>

        <div className="text-slate-500">at</div>

        {/* Home Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <div className="mr-auto text-2xl font-bold text-white">
            {typeof homeScore === "number" ? homeScore : "-"}
          </div>
          <div className="truncate text-right">
            <div className="font-semibold text-white truncate">
              {homeTeam.city} {homeTeam.name}
            </div>
            <div className="text-slate-300 text-sm">{homeTeam.abbreviation}</div>
          </div>
          <TeamLogo team={homeTeam} />
        </div>
      </div>

      {/* Venue */}
      {venue && (
        <div className="mt-3 text-xs text-slate-400">
          {venue}
        </div>
      )}

      {/* Win Probability Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-300 mb-1">
          <span>
            {awayTeam.abbreviation} {awayPct}%
          </span>
          <span>
            {homeTeam.abbreviation} {homePct}%
          </span>
        </div>
        <div className="w-full h-2 rounded bg-slate-800 overflow-hidden">
          <div
            className="h-2 bg-sky-500"
            style={{ width: `${Math.max(0, Math.min(100, awayPct))}%` }}
            title={`${awayTeam.abbreviation} ${awayPct}%`}
          />
          <div
            className="h-2 bg-emerald-500 -mt-2"
            style={{ width: `${Math.max(0, Math.min(100, homePct))}%` }}
            title={`${homeTeam.abbreviation} ${homePct}%`}
          />
        </div>
      </div>
    </div>
  );
}
