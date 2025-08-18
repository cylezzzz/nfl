// src/pages/Predictions.tsx - Enhanced Version (nur mit vorhandenen Komponenten)
import React from 'react';
import Layout from '../components/Layout';
import PredictionChart from '../components/PredictionChart';
import GameCard from '../components/GameCard';
import { todaysGames, predictions } from '../data/mockData';
import { Brain, Target, TrendingUp, Zap, Award, Activity } from 'lucide-react';

const Predictions: React.FC = () => {
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);
  const [modelAccuracy, setModelAccuracy] = React.useState(73);
  
  // Simuliere Model-Performance Updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setModelAccuracy(prev => {
        const change = (Math.random() - 0.5) * 2; // -1 bis +1
        return Math.max(65, Math.min(85, prev + change));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ 
    title, 
    value, 
    unit, 
    color, 
    icon: Icon, 
    trend 
  }: {
    title: string;
    value: number;
    unit: string;
    color: string;
    icon: any;
    trend?: string;
  }) => (
    <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`text-${color}-400`} size={24} />
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-900/40 text-green-400' : 
            trend === 'down' ? 'bg-red-900/40 text-red-400' : 
            'bg-slate-800 text-slate-400'
          }`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trend}
          </span>
        )}
      </div>
      <div className="text-center">
        <div className={`text-3xl font-bold text-${color}-400 mb-1`}>
          {value}{unit}
        </div>
        <div className="text-slate-400 text-sm">{title}</div>
      </div>
    </div>
  );

  const AccuracyBar = ({ label, percentage, color }: {
    label: string;
    percentage: number;
    color: string;
  }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-slate-300 mb-2">
        <span>{label}</span>
        <span className="font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  const EnhancedGameCard = ({ game, prediction, isSelected, onClick }: {
    game: any;
    prediction: any;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <div 
      className={`cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-purple-500 scale-105' : 'hover:scale-102'
      }`}
      onClick={onClick}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-bold text-sm">PLAYOFF</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain size={14} className="text-purple-400" />
            <span className="text-purple-400 text-sm">{prediction.confidence}%</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="text-center">
            <img 
              src={game.awayTeam.logo}
              alt={`${game.awayTeam.city} ${game.awayTeam.name}`}
              className="w-12 h-12 object-contain mx-auto mb-2"
            />
            <div className="font-semibold text-white text-sm">{game.awayTeam.abbreviation}</div>
            <div className="text-lg font-bold text-blue-400">
              {prediction.awayWinProbability}%
            </div>
          </div>

          <div className="text-center">
            <div className="text-slate-400 text-lg mb-2">@</div>
            <div className="text-purple-400 font-bold">
              {prediction.predictedScore.away}-{prediction.predictedScore.home}
            </div>
          </div>

          <div className="text-center">
            <img 
              src={game.homeTeam.logo}
              alt={`${game.homeTeam.city} ${game.homeTeam.name}`}
              className="w-12 h-12 object-contain mx-auto mb-2"
            />
            <div className="font-semibold text-white text-sm">{game.homeTeam.abbreviation}</div>
            <div className="text-lg font-bold text-red-400">
              {prediction.homeWinProbability}%
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 text-center mb-3">
          {game.venue} • {game.date} {game.time}
        </div>

        {/* Win Probability Bar */}
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000"
            style={{ width: `${prediction.awayWinProbability}%` }}
          />
          <div 
            className="absolute right-0 top-0 h-full bg-red-500 transition-all duration-1000"
            style={{ width: `${prediction.homeWinProbability}%` }}
          />
        </div>

        {isSelected && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="text-xs text-slate-300 mb-2">Key Factors:</div>
            <div className="space-y-1">
              {prediction.factors.slice(0, 2).map((factor: string, idx: number) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="text-purple-400" size={32} />
            <h1 className="text-4xl font-bold text-white">AI Predictions</h1>
            <Zap className="text-yellow-400" size={28} />
          </div>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Advanced machine learning models analyze team performance, player stats, 
            and situational factors to predict NFL playoff outcomes with high accuracy.
          </p>
        </div>

        {/* Model Performance Metrics */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Target className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Model Performance</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Overall Accuracy"
              value={Math.round(modelAccuracy)}
              unit="%"
              color="green"
              icon={Target}
              trend="up"
            />
            <MetricCard 
              title="Games Predicted"
              value={142}
              unit=""
              color="blue"
              icon={Activity}
              trend="up"
            />
            <MetricCard 
              title="Spread Accuracy"
              value={81}
              unit="%"
              color="yellow"
              icon={TrendingUp}
              trend="stable"
            />
            <MetricCard 
              title="Playoff Accuracy"
              value={89}
              unit="%"
              color="purple"
              icon={Award}
              trend="up"
            />
          </div>

          {/* Detailed Accuracy Breakdown */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6">
            <h3 className="text-white font-bold text-lg mb-4">Accuracy Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <AccuracyBar label="Regular Season" percentage={73} color="blue" />
                <AccuracyBar label="Playoffs" percentage={89} color="purple" />
                <AccuracyBar label="Prime Time Games" percentage={78} color="yellow" />
              </div>
              <div>
                <AccuracyBar label="Division Games" percentage={71} color="red" />
                <AccuracyBar label="Conference Games" percentage={76} color="green" />
                <AccuracyBar label="Weather Games" percentage={82} color="cyan" />
              </div>
            </div>
          </div>
        </section>

        {/* Today's Predictions */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Playoff Predictions</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Game Cards */}
            <div className="space-y-4">
              {todaysGames.map((game, index) => {
                const prediction = predictions[index];
                if (!prediction) return null;
                
                return (
                  <EnhancedGameCard
                    key={game.id}
                    game={game}
                    prediction={prediction}
                    isSelected={selectedGame === game.id}
                    onClick={() => setSelectedGame(
                      selectedGame === game.id ? null : game.id
                    )}
                  />
                );
              })}
            </div>

            {/* Prediction Chart */}
            <div className="space-y-4">
              {selectedGame ? (
                (() => {
                  const gameIndex = todaysGames.findIndex(g => g.id === selectedGame);
                  const game = todaysGames[gameIndex];
                  const prediction = predictions[gameIndex];
                  
                  return game && prediction ? (
                    <PredictionChart
                      prediction={prediction}
                      homeTeam={`${game.homeTeam.city} ${game.homeTeam.name}`}
                      awayTeam={`${game.awayTeam.city} ${game.awayTeam.name}`}
                    />
                  ) : null;
                })()
              ) : (
                <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-8 text-center">
                  <Brain className="text-purple-400 mx-auto mb-4" size={48} />
                  <h3 className="text-white font-bold text-lg mb-2">Select a Game</h3>
                  <p className="text-slate-400">
                    Click on any game above to view detailed AI predictions, 
                    win probability analysis, and key factors influencing the outcome.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-blue-400 font-bold">Advanced Analytics</div>
                      <div className="text-slate-300">Team performance metrics</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-purple-400 font-bold">AI Confidence</div>
                      <div className="text-slate-300">Prediction reliability score</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AI Model Info */}
        <section className="bg-slate-900/60 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-yellow-400" size={24} />
            <h3 className="text-white font-bold text-lg">About Our AI Model</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Activity className="text-blue-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">Real-time Data</h4>
              <p className="text-slate-400 text-sm">
                Continuously updated with live player stats, injury reports, and team performance metrics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Brain className="text-purple-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">Machine Learning</h4>
              <p className="text-slate-400 text-sm">
                Neural networks trained on 10+ years of NFL data including weather, venue, and historical matchups.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="text-green-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">Proven Accuracy</h4>
              <p className="text-slate-400 text-sm">
                73% overall accuracy with 89% success rate in playoff predictions over the past 3 seasons.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Predictions;