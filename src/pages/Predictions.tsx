import React from 'react';
import PredictionChart from '../components/PredictionChart';
import GameCard from '../components/GameCard';
import { todaysGames, predictions } from '../data/mockData';
import { Brain, Target, TrendingUp } from 'lucide-react';

const Predictions: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="text-purple-400" size={32} />
          <h1 className="text-4xl font-bold text-white">AI Predictions</h1>
        </div>
        <p className="text-white/70 text-lg">
          Advanced machine learning models analyze team performance to predict game outcomes
        </p>
      </div>

      {/* Model Performance */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Target className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Model Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-center">
              <div className="text-3xl text-green-400 mb-2">73%</div>
              <div className="text-white/70 text-sm">Overall Accuracy</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-center">
              <div className="text-3xl text-blue-400 mb-2">142</div>
              <div className="text-white/70 text-sm">Games Predicted</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-center">
              <div className="text-3xl text-yellow-400 mb-2">81%</div>
              <div className="text-white/70 text-sm">Spread Accuracy</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-center">
              <div className="text-3xl text-purple-400 mb-2">67%</div>
              <div className="text-white/70 text-sm">O/U Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Predictions */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Today's Predictions</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {todaysGames.map((game, index) => {
            const prediction = predictions[index];
            if (!prediction) return null;
            
            return (
              <div key={game.id} className="space-y-6">
                <GameCard game={game} showPrediction />
                <PredictionChart
                  prediction={prediction}
                  homeTeam={`${game.homeTeam.city} ${game.homeTeam.name}`}
                  awayTeam={`${game.awayTeam.city} ${game.awayTeam.name}`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology */}
      <section>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-white font-bold text-lg mb-4">Prediction Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Team Performance</h4>
              <ul className="text-sm space-y-1">
                <li>• Offensive & Defensive ratings</li>
                <li>• Recent form (last 5 games)</li>
                <li>• Home/Away performance</li>
                <li>• Turnover differential</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Situational Factors</h4>
              <ul className="text-sm space-y-1">
                <li>• Head-to-head history</li>
                <li>• Divisional matchups</li>
                <li>• Rest days</li>
                <li>• Travel distance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">External Variables</h4>
              <ul className="text-sm space-y-1">
                <li>• Weather conditions</li>
                <li>• Injury reports</li>
                <li>• Coaching changes</li>
                <li>• Motivation factors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Predictions;