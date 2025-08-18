// src/components/GameCard.tsx - Enhanced Version (angepasst an deine vorhandenen Types)
import React from "react";
import type { Game, Team } from "../types";
import { Clock, MapPin, TrendingUp, Zap, Users } from "lucide-react";

type Props = {
  game: Game;
  onClick?: () => void;
  showPrediction?: boolean;
  compact?: boolean;
};

function TeamLogo({ team }: { team: Team }) {
  const [src, setSrc] = React.useState<string>(team.logo || "");
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      setSrc(`https://a.espncdn.com/i/teamlogos/nfl/500/${team.abbreviation.toLowerCase()}.png`);
    }
  };

  return (
    <div className="relative group">
      <img
        src={src}
        alt={`${team.city} ${team.name} logo`}
        className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={handleError}
      />
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </div>
  );
}

function formatDateTime(date: string | undefined, time: string | undefined) {
  if (!date && !time) return "";
  try {
    const iso = date && time ? `${date}T${time}:00` : date || "";
    const d = iso ? new Date(iso) : undefined;
    return d ? d.toLocaleString() : `${date ?? ""} ${time ?? ""}`.trim();
  } catch {
    return `${date ?? ""} ${time ?? ""}`.trim();
  }
}

function getStatusInfo(status: string) {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('live') || statusLower.includes('in progress') || statusLower === 'live') {
    return {
      color: 'red',
      label: 'LIVE',
      animate: true,
      icon: Zap
    };
  } else if (statusLower.includes('final') || statusLower === 'completed') {
    return {
      color: 'green', 
      label: 'FINAL',
      animate: false,
      icon: Users
    };
  } else {
    return {
      color: 'blue',
      label: 'SCHEDULED', 
      animate: false,
      icon: Clock
    };
  }
}

export default function GameCard({ game, onClick, showPrediction = false, compact = false }: Props) {
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
  const statusInfo = getStatusInfo(status ?? "scheduled");

  return (
    <div
      className={`group relative rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm 
        hover:border-slate-600 transition-all duration-300 cursor-pointer overflow-hidden
        ${compact ? 'p-3' : 'p-4'} 
        ${onClick ? 'hover:scale-[1.02] hover:shadow-xl' : ''}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-red-600/10"></div>
      </div>

      {/* Status Header */}
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-3'} relative z-10`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full bg-${statusInfo.color}-500 ${statusInfo.animate ? 'animate-pulse' : ''}`}></div>
          <span className={`text-${statusInfo.color}-400 font-bold text-sm`}>
            {statusInfo.label}
          </span>
          {status && status !== statusInfo.label.toLowerCase() && (
            <span className="text-slate-400 text-xs">
              • {status}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-slate-400 space-x-3">
          {showPrediction && winProbability && (
            <div className="flex items-center space-x-1 text-purple-400">
              <TrendingUp size={12} />
              <span className="text-xs font-medium">Prediction</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span className="text-xs">{formatDateTime(date as any, time as any)}</span>
          </div>
        </div>
      </div>

      {/* Teams & Scores */}
      <div className={`flex items-center ${compact ? 'gap-3' : 'gap-4'} relative z-10`}>
        {/* Away Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo team={awayTeam} />
          <div className="flex-1 min-w-0">
            <div className={`font-semibold text-white truncate ${compact ? 'text-sm' : ''}`}>
              {compact ? awayTeam.abbreviation : `${awayTeam.city} ${awayTeam.name}`}
            </div>
            <div className="text-slate-300 text-xs">
              {awayTeam.wins}-{awayTeam.losses}
              {!compact && <span className="ml-2">{awayTeam.abbreviation}</span>}
            </div>
          </div>
          <div className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
            {typeof awayScore === "number" ? awayScore : "-"}
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center">
          <div className="text-slate-500 font-bold">@</div>
          {showPrediction && winProbability && (
            <div className="text-xs text-slate-400 mt-1">vs</div>
          )}
        </div>

        {/* Home Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <div className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
            {typeof homeScore === "number" ? homeScore : "-"}
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className={`font-semibold text-white truncate ${compact ? 'text-sm' : ''}`}>
              {compact ? homeTeam.abbreviation : `${homeTeam.city} ${homeTeam.name}`}
            </div>
            <div className="text-slate-300 text-xs">
              {!compact && <span className="mr-2">{homeTeam.abbreviation}</span>}
              {homeTeam.wins}-{homeTeam.losses}
            </div>
          </div>
          <TeamLogo team={homeTeam} />
        </div>
      </div>

      {/* Venue */}
      {venue && !compact && (
        <div className="mt-3 flex items-center text-xs text-slate-400 relative z-10">
          <MapPin size={12} className="mr-1" />
          <span>{venue}</span>
        </div>
      )}

      {/* Win Probability Section */}
      {showPrediction && winProbability && (
        <div className={`${compact ? 'mt-2' : 'mt-4'} relative z-10`}>
          <div className="flex justify-between text-xs text-slate-300 mb-2">
            <span className="flex items-center space-x-1">
              <span>{awayTeam.abbreviation}</span>
              <span className="font-bold text-blue-400">{awayPct}%</span>
            </span>
            <span className="text-slate-500">Win Probability</span>
            <span className="flex items-center space-x-1">
              <span className="font-bold text-red-400">{homePct}%</span>
              <span>{homeTeam.abbreviation}</span>
            </span>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="absolute inset-0 flex">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, awayPct))}%` }}
                title={`${awayTeam.abbreviation} ${awayPct}%`}
              />
              <div
                className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, homePct))}%` }}
                title={`${homeTeam.abbreviation} ${homePct}%`}
              />
            </div>
            
            {/* Glowing effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
      
      {/* Click Ripple Effect */}
      {onClick && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
        </div>
      )}
    </div>
  );
}