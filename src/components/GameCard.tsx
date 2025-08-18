import React from 'react';
import { Game } from '../types';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';

interface GameCardProps {
  game: Game;
  showPrediction?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, showPrediction = false }) => {
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  const TeamLogo: React.FC<{ team: any; size?: string }> = ({ team, size = "w-12 h-12" }) => (
    <div className={`${size} flex items-center justify-center flex-shrink-0`}>
      <img
        src={team.logo}
        alt={`${team.name} logo`}
        className={`${size} object-contain`}
        onError={(e) => {
          // Fallback zu Team-Abkürzung wenn Logo nicht lädt
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallbackDiv = document.createElement('div');
          fallbackDiv.className = 'text-2xl font-bold text-white bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center';
          fallbackDiv.textContent = team.abbreviation;
          target.parentElement!.appendChild(fallbackDiv);
        }}
      />
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <Clock size={16} />
          <span>{formatTime(game.time)}</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <MapPin size={16} />
          <span className="truncate max-w-[200px]">{game.venue}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        {/* Away Team */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <TeamLogo team={game.