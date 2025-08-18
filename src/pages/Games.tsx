import React from 'react';
import GameCard from '../components/GameCard';
import { todaysGames, recentGames } from '../data/mockData';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const Games: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calendar className="text-blue-400" size={32} />
          <h1 className="text-4xl font-bold text-white">NFL Games</h1>
        </div>
        <p className="text-white/70 text-lg">
          Upcoming matchups, recent results, and game predictions
        </p>
      </div>

      {/* Upcoming Games */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Upcoming Games</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todaysGames.map((game) => (
            <GameCard key={game.id} game={game} showPrediction />
          ))}
        </div>
      </section>

      {/* Recent Results */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Recent Results</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Week Navigation */}
      <section>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-white font-bold text-lg mb-4">Navigate by Week</h3>
          <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-18 gap-2">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
              <button
                key={week}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  week === 19
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                W{week}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;