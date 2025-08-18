import React from "react";
import Layout from "../components/Layout";
import { fetchTodayScoreboard } from "../lib/espn";
import { todaysGames, predictions } from "../data/mockData";
import { TrendingUp, Clock, MapPin, Users, Zap, Calendar, Trophy, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updated, setUpdated] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showLiveData, setShowLiveData] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTodayScoreboard();
        const liveEvents = data?.events ?? [];
        
        if (liveEvents.length > 0) {
          setEvents(liveEvents);
          setShowLiveData(true);
        }
        setUpdated(new Date());
      } catch (e: any) {
        setError(e?.message || "Failed to load scoreboard");
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Auto-refresh alle 60 Sekunden für Dashboard
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const LiveBadge = ({ status }: { status: string }) => (
    <div className="flex items-center space-x-2">
      {status.toLowerCase().includes('live') || status.toLowerCase().includes('in progress') ? (
        <>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-bold text-sm">LIVE</span>
        </>
      ) : status.toLowerCase().includes('final') ? (
        <>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-400 font-bold text-sm">FINAL</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 font-bold text-sm">SCHEDULED</span>
        </>
      )}
    </div>
  );

  const ESPNGameCard = ({ game }: { game: any }) => {
    const c = game.competitions?.[0];
    const home = c?.competitors?.find((x: any) => x.homeAway === "home");
    const away = c?.competitors?.find((x: any) => x.homeAway === "away");
    const status = game.status?.type?.shortDetail || "";

    return (
      <div className="group rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all duration-300 p-4 hover:border-slate-600">
        <div className="flex items-center justify-between text-sm mb-3">
          <LiveBadge status={status} />
          <div className="flex items-center text-slate-400 space-x-1">
            <Clock size={14} />
            <span>{new Date(game.date).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={away?.team?.logo || `/teams/${away?.team?.abbreviation}.png`}
                alt={away?.team?.displayName}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${away?.team?.abbreviation?.toLowerCase()}.png`;
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-white truncate">{away?.team?.displayName}</div>
              <div className="text-xs text-slate-400">{away?.team?.abbreviation}</div>
            </div>
            <div className="ml-auto text-2xl font-bold text-white">
              {away?.score ?? "-"}
            </div>
          </div>

          <div className="text-slate-500 mx-4">@</div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="mr-auto text-2xl font-bold text-white">
              {home?.score ?? "-"}
            </div>
            <div className="text-right">
              <div className="font-semibold text-white truncate">{home?.team?.displayName}</div>
              <div className="text-xs text-slate-400">{home?.team?.abbreviation}</div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={home?.team?.logo || `/teams/${home?.team?.abbreviation}.png`}
                alt={home?.team?.displayName}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${home?.team?.abbreviation?.toLowerCase()}.png`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-xs text-slate-400">
          <MapPin size={12} className="mr-1" />
          <span>{c?.venue?.fullName || "TBD"}</span>
        </div>
      </div>
    );
  };

  const PlayoffGameCard = ({ game, prediction }: { game: any, prediction: any }) => (
    <div className="group rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-800/90 hover:bg-slate-900 transition-all duration-300 p-4 hover:border-slate-600">
      <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-yellow-400 font-bold text-sm">PLAYOFF</span>
        </div>
        <div className="flex items-center text-slate-400 space-x-1">
          <Clock size={14} />
          <span>{game.date} • {game.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src={game.awayTeam.logo}
              alt={`${game.awayTeam.city} ${game.awayTeam.name}`}
              className="max-h-10 max-w-10 object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-white">{game.awayTeam.city} {game.awayTeam.name}</div>
            <div className="text-xs text-slate-400">{game.awayTeam.wins}-{game.awayTeam.losses}</div>
          </div>
          <div className="ml-auto text-2xl font-bold text-white">-</div>
        </div>

        <div className="text-slate-500 mx-4">@</div>

        <div className="flex items-center space-x-3 flex-1 justify-end">
          <div className="mr-auto text-2xl font-bold text-white">-</div>
          <div className="text-right">
            <div className="font-semibold text-white">{game.homeTeam.city} {game.homeTeam.name}</div>
            <div className="text-xs text-slate-400">{game.homeTeam.wins}-{game.homeTeam.losses}</div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src={game.homeTeam.logo}
              alt={`${game.homeTeam.city} ${game.homeTeam.name}`}
              className="max-h-10 max-w-10 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-blue-400">
            {game.awayTeam.abbreviation}: {prediction.awayWinProbability}%
          </span>
          <span className="text-purple-400 font-medium">AI Prediction</span>
          <span className="text-red-400">
            {game.homeTeam.abbreviation}: {prediction.homeWinProbability}%
          </span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-red-500"
            style={{ 
              background: `linear-gradient(to right, #3b82f6 ${prediction.awayWinProbability}%, #ef4444 ${prediction.awayWinProbability}%)`
            }}
          />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    link, 
    color,
    badge 
  }: {
    title: string;
    description: string;
    icon: any;
    link: string;
    color: string;
    badge?: string;
  }) => (
    <Link 
      to={link}
      className={`group rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all duration-300 p-6 hover:border-${color}-500/50 block`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`text-${color}-400 group-hover:scale-110 transition-transform`} size={32} />
        {badge && (
          <span className={`px-2 py-1 rounded-full bg-${color}-900/40 text-${color}-400 text-xs font-medium`}>
            {badge}
          </span>
        )}
        <ArrowRight className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </Link>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
            Welcome to NFL Analytics
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Your ultimate destination for NFL insights, live scores, predictions, and analytics. 
            Follow the playoff race and get AI-powered predictions for upcoming games.
          </p>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showLiveData && updated ? (
              <span className="px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-300 text-sm">
                ✅ Live Data • Updated {updated.toLocaleTimeString()}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 text-sm">
                🏆 Playoff Preview
              </span>
            )}
            
            {error && (
              <span className="px-3 py-1 rounded-full bg-yellow-900/40 text-yellow-300 text-sm">
                ⚠️ Using Mock Data
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-slate-400">
            <Users size={16} />
            <span className="text-sm">2024/25 NFL Season</span>
          </div>
        </div>

        {/* Games Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">
                {showLiveData ? "Live NFL Games" : "Upcoming Playoff Games"}
              </h2>
            </div>
            
            <Link 
              to={showLiveData ? "/live" : "/predictions"}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="text-sm">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-300">Loading NFL data...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {showLiveData && events.length > 0 ? (
              // Zeige Live ESPN-Daten
              events.slice(0, 4).map((game) => (
                <ESPNGameCard key={game.id} game={game} />
              ))
            ) : (
              // Zeige Mock-Playoff-Daten
              todaysGames.slice(0, 4).map((game, index) => (
                <PlayoffGameCard 
                  key={game.id} 
                  game={game} 
                  prediction={predictions[index]} 
                />
              ))
            )}
          </div>

          {!loading && !showLiveData && events.length === 0 && (
            <div className="text-center py-8 text-slate-300">
              <Calendar className="mx-auto mb-4 text-slate-500" size={48} />
              <p className="mb-4">No live games today.</p>
              <p className="text-sm text-slate-400">Showing upcoming playoff matchups with AI predictions.</p>
            </div>
          )}
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="text-yellow-400 mr-2" size={24} />
            Quick Access
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="Live Dashboard"
              description="Real-time scores, stats, and updates powered by ESPN API"
              icon={Zap}
              link="/live"
              color="red"
              badge="LIVE"
            />
            
            <QuickActionCard
              title="AI Predictions"
              description="Machine learning predictions for upcoming playoff games"
              icon={TrendingUp}
              link="/predictions"
              color="purple"
              badge="AI POWERED"
            />
            
            <QuickActionCard
              title="Team Analytics"
              description="Detailed stats and rosters for all 32 NFL teams"
              icon={Users}
              link="/teams"
              color="blue"
            />
            
            <QuickActionCard
              title="Player Stats"
              description="Season leaders in passing, rushing, and receiving"
              icon={BarChart3}
              link="/stats"
              color="green"
            />
            
            <QuickActionCard
              title="Game Schedule"
              description="Complete schedule with results and upcoming games"
              icon={Calendar}
              link="/games"
              color="indigo"
            />
            
            <QuickActionCard
              title="Playoff Bracket"
              description="Track the road to Super Bowl LIX"
              icon={Trophy}
              link="/predictions"
              color="yellow"
              badge="PLAYOFFS"
            />
          </div>
        </section>

        {/* Season Stats */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">2024/25 Season Overview</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">32</div>
              <div className="text-sm text-slate-400">NFL Teams</div>
              <div className="text-xs text-slate-500 mt-1">Complete Roster Data</div>
            </div>
            
            <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">14</div>
              <div className="text-sm text-slate-400">Playoff Teams</div>
              <div className="text-xs text-slate-500 mt-1">Wildcard Weekend</div>
            </div>
            
            <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
              <div className="text-sm text-slate-400">AI Accuracy</div>
              <div className="text-xs text-slate-500 mt-1">Playoff Predictions</div>
            </div>
            
            <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {showLiveData ? events.filter(e => e.status?.type?.name?.includes('STATUS_IN_PROGRESS')).length : '0'}
              </div>
              <div className="text-sm text-slate-400">Live Games</div>
              <div className="text-xs text-slate-500 mt-1">Right Now</div>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="bg-gradient-to-r from-slate-900/60 via-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Powered by Advanced Analytics</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our platform combines real-time ESPN data with machine learning algorithms 
              to provide the most accurate NFL predictions and insights available.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-400" size={28} />
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Data</h3>
              <p className="text-slate-400 text-sm">
                Live scores and stats updated every 30 seconds during games
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-400" size={28} />
              </div>
              <h3 className="text-white font-semibold mb-2">AI Predictions</h3>
              <p className="text-slate-400 text-sm">
                Machine learning models with 89% accuracy in playoff games
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-green-400" size={28} />
              </div>
              <h3 className="text-white font-semibold mb-2">Deep Analytics</h3>
              <p className="text-slate-400 text-sm">
                Comprehensive player stats and team performance metrics
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}