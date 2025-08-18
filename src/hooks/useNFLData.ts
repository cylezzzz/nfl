// src/hooks/useNFLData.ts
import { useState, useEffect, useCallback } from 'react';
import { Player, Game, Prediction } from '../types';
import { nflApiService } from '../services/nflApi';
import { aiPredictionService } from '../services/aiPredictionService';
import { players as mockPlayers, todaysGames as mockGames, predictions as mockPredictions } from '../data/mockData';

interface NFLDataState {
  players: Player[];
  todaysGames: Game[];
  recentGames: Game[];
  predictions: Prediction[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const useNFLData = () => {
  const [state, setState] = useState<NFLDataState>({
    players: mockPlayers,
    todaysGames: mockGames,
    recentGames: [],
    predictions: mockPredictions,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const updatePlayers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Versuche Live-Daten zu laden
      const livePlayers = await nflApiService.getAllPlayers();
      
      if (livePlayers.length > 0) {
        setState(prev => ({
          ...prev,
          players: livePlayers,
          loading: false,
          lastUpdated: new Date()
        }));
        console.log('✅ Live player data loaded successfully');
      } else {
        // Fallback zu Mock-Daten
        setState(prev => ({
          ...prev,
          players: mockPlayers,
          loading: false,
          lastUpdated: new Date()
        }));
        console.log('⚠️ Using mock player data as fallback');
      }
    } catch (error) {
      console.error('❌ Error loading player data:', error);
      setState(prev => ({
        ...prev,
        players: mockPlayers,
        loading: false,
        error: 'Failed to load live player data. Using cached data.',
        lastUpdated: new Date()
      }));
    }
  }, []);

  const updateGames = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Versuche Live-Spieldaten zu laden
      const liveGames = await nflApiService.getCurrentGames();
      
      if (liveGames.length > 0) {
        const currentGames = liveGames.filter(game => game.status !== 'completed');
        const completedGames = liveGames.filter(game => game.status === 'completed');
        
        setState(prev => ({
          ...prev,
          todaysGames: currentGames.length > 0 ? currentGames : mockGames,
          recentGames: completedGames.slice(0, 6),
          loading: false,
          lastUpdated: new Date()
        }));
        console.log('✅ Live game data loaded successfully');
      } else {
        // Fallback zu Mock-Daten
        setState(prev => ({
          ...prev,
          todaysGames: mockGames,
          recentGames: [],
          loading: false,
          lastUpdated: new Date()
        }));
        console.log('⚠️ Using mock game data as fallback');
      }
    } catch (error) {
      console.error('❌ Error loading game data:', error);
      setState(prev => ({
        ...prev,
        todaysGames: mockGames,
        recentGames: [],
        loading: false,
        error: 'Failed to load live game data. Using cached data.',
        lastUpdated: new Date()
      }));
    }
  }, []);

  const updatePredictions = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Generiere KI-Vorhersagen für aktuelle Spiele
      const currentGames = state.todaysGames;
      
      if (currentGames.length > 0) {
        const aiPredictions = await aiPredictionService.batchGeneratePredictions(currentGames);
        
        setState(prev => ({
          ...prev,
          predictions: aiPredictions.length > 0 ? aiPredictions : mockPredictions,
          loading: false,
          lastUpdated: new Date()
        }));
        console.log('✅ AI predictions generated successfully');
      } else {
        setState(prev => ({
          ...prev,
          predictions: mockPredictions,
          loading: false,
          lastUpdated: new Date()
        }));
      }
    } catch (error) {
      console.error('❌ Error generating predictions:', error);
      setState(prev => ({
        ...prev,
        predictions: mockPredictions,
        loading: false,
        error: 'Failed to generate AI predictions. Using default predictions.',
        lastUpdated: new Date()
      }));
    }
  }, [state.todaysGames]);

  const refreshAllData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Parallel loading für bessere Performance
      await Promise.all([
        updatePlayers(),
        updateGames()
      ]);
      
      // Predictions nach Games laden
      setTimeout(() => {
        updatePredictions();
      }, 500);
      
    } catch (error) {
      console.error('❌ Error refreshing data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to refresh data. Some information may be outdated.'
      }));
    }
  }, [updatePlayers, updateGames, updatePredictions]);

  const getTeamRoster = useCallback(async (teamId: string): Promise<Player[]> => {
    try {
      const roster = await nflApiService.getTeamRoster(teamId);
      return roster.length > 0 ? roster : state.players.filter(p => p.teamId === teamId);
    } catch (error) {
      console.error(`❌ Error loading roster for team ${teamId}:`, error);
      return state.players.filter(p => p.teamId === teamId);
    }
  }, [state.players]);

  // Auto-refresh Daten alle 5 Minuten
  useEffect(() => {
    // Initial load
    refreshAllData();
    
    // Setup auto-refresh
    const interval = setInterval(() => {
      refreshAllData();
    }, 5 * 60 * 1000); // 5 Minuten
    
    return () => clearInterval(interval);
  }, [refreshAllData]);

  // Update predictions wenn sich Spiele ändern
  useEffect(() => {
    if (state.todaysGames.length > 0 && !state.loading) {
      const timer = setTimeout(() => {
        updatePredictions();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [state.todaysGames, state.loading, updatePredictions]);

  return {
    ...state,
    refreshAllData,
    updatePlayers,
    updateGames,
    updatePredictions,
    getTeamRoster,
    // Utility functions
    isDataFresh: state.lastUpdated ? (Date.now() - state.lastUpdated.getTime()) < 5 * 60 * 1000 : false,
    dataAge: state.lastUpdated ? Math.floor((Date.now() - state.lastUpdated.getTime()) / 60000) : null
  };
};

// Custom Hook für Team-spezifische Daten
export const useTeamData = (teamId: string) => {
  const { players, getTeamRoster } = useNFLData();
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTeamData = async () => {
      setLoading(true);
      try {
        const roster = await getTeamRoster(teamId);
        setTeamPlayers(roster);
      } catch (error) {
        console.error(`Error loading team data for ${teamId}:`, error);
        setTeamPlayers(players.filter(p => p.teamId === teamId));
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      loadTeamData();
    }
  }, [teamId, getTeamRoster, players]);

  return {
    teamPlayers,
    loading
  };
};

// Custom Hook für Live-Game Updates
export const useLiveGameUpdates = (gameId?: string) => {
  const { todaysGames, updateGames } = useNFLData();
  const [liveGame, setLiveGame] = useState<Game | null>(null);

  useEffect(() => {
    if (gameId) {
      const game = todaysGames.find(g => g.id === gameId);
      setLiveGame(game || null);
      
      // Setup live updates für laufende Spiele
      if (game?.status === 'live') {
        const interval = setInterval(() => {
          updateGames();
        }, 30000); // 30 Sekunden für Live-Spiele
        
        return () => clearInterval(interval);
      }
    }
  }, [gameId, todaysGames, updateGames]);

  return {
    liveGame,
    isLive: liveGame?.status === 'live'
  };
};