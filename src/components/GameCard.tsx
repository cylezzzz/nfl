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
          <span className="truncate">{game.venue}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        {/* Away Team */}
        <div className="flex items-center space-x-3 flex-1">
          <div className="text-3xl">{game.awayTeam.logo}</div>
          <div>
            <div className="text-white font-semibold text-lg">
              {game.awayTeam.city}
            </div>
            <div className="text-white/70 text-sm">
              {game.awayTeam.name} ({game.awayTeam.wins}-{game.awayTeam.losses})
            </div>
          </div>
        </div>

        {/* VS / Score */}
        <div className="mx-4 text-center">
          {game.status === 'completed' ? (
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-xl">
                {game.awayScore} - {game.homeScore}
              </div>
              <div className="text-white/70 text-xs uppercase tracking-wide">
                Final
              </div>
            </div>
          ) : (
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-lg">VS</div>
              <div className="text-white/70 text-xs uppercase tracking-wide">
                Week {game.week}
              </div>
            </div>
          )}
        </div>

        {/* Home Team */}
        <div className="flex items-center space-x-3 flex-1 flex-row-reverse">
          <div className="text-3xl">{game.homeTeam.logo}</div>
          <div className="text-right">
            <div className="text-white font-semibold text-lg">
              {game.homeTeam.city}
            </div>
            <div className="text-white/70 text-sm">
              {game.homeTeam.name} ({game.homeTeam.wins}-{game.homeTeam.losses})
            </div>
          </div>
        </div>
      </div>

      {/* Win Probability */}
      {showPrediction && game.winProbability && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Win Probability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: `${game.winProbability.away}%` }}
              />
            </div>
            <div className="text-white text-sm font-medium min-w-[60px] text-center">
              {game.winProbability.away}% - {game.winProbability.home}%
            </div>
            <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-l from-red-500 to-red-400 ml-auto"
                style={{ width: `${game.winProbability.home}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;