// Core NFL Types
export interface Team {
  id: string;
  name: string;
  city: string;
  abbreviation: string;
  division: string;
  conference: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  wins: number;
  losses: number;
  ties: number;
  
  // Extended properties
  record?: string;
  powerRanking?: number;
  playoffSeed?: number;
  divisionRank?: number;
  conferenceRank?: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  teamId: string;
  
  // Stats
  passingYards?: number;
  rushingYards?: number;
  receivingYards?: number;
  touchdowns: number;
  tackles?: number;
  interceptions?: number;
  
  // Additional info
  age?: number;
  height?: string;
  weight?: number;
  college?: string;
  experience?: number;
  
  // Season stats
  gamesPlayed?: number;
  passingAttempts?: number;
  passingCompletions?: number;
  passingTouchdowns?: number;
  rushingAttempts?: number;
  rushingTouchdowns?: number;
  receptions?: number;
  receivingTouchdowns?: number;
  fumbles?: number;
  sacks?: number;
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  week: number;
  season: number;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  venue: string;
  
  // Enhanced game data
  winProbability?: {
    home: number;
    away: number;
  };
  weather?: WeatherConditions;
  odds?: GameOdds;
  attendance?: number;
  isPlayoff?: boolean;
  playoffRound?: 'wildcard' | 'divisional' | 'conference' | 'superbowl';
  
  // Live game data
  quarter?: number;
  timeRemaining?: string;
  possession?: string;
  down?: number;
  distance?: number;
  yardLine?: number;
  lastPlay?: string;
}

export interface WeatherConditions {
  temperature: number;
  conditions: string;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  precipitation?: string;
}

export interface GameOdds {
  spread: number;
  overUnder: number;
  moneylineHome: number;
  moneylineAway: number;
}

export interface Prediction {
  gameId: string;
  homeWinProbability: number;
  awayWinProbability: number;
  predictedScore: {
    home: number;
    away: number;
  };
  confidence: number;
  factors: string[];
  
  // Enhanced prediction data
  spreadPrediction?: number;
  overUnderPrediction?: number;
  keyMatchups?: string[];
  riskFactors?: string[];
  modelVersion?: string;
  lastUpdated?: Date;
}

export interface Standing {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
  divisionRank: number;
  conferenceRank: number;
  
  // Extended standings data
  pointsFor: number;
  pointsAgainst: number;
  pointsDifferential: number;
  homeRecord: string;
  awayRecord: string;
  divisionRecord: string;
  conferenceRecord: string;
  streak: string;
  lastFiveGames: string;
  playoffProbability?: number;
}

// API Response Types
export interface ESPNGameResponse {
  events: ESPNEvent[];
  leagues: any[];
  season: any;
  week: any;
}

export interface ESPNEvent {
  id: string;
  date: string;
  name: string;
  status: {
    clock: number;
    displayClock: string;
    period: number;
    type: {
      id: string;
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
  competitions: ESPNCompetition[];
  week: {
    number: number;
  };
  season: {
    year: number;
    type: number;
  };
}

export interface ESPNCompetition {
  id: string;
  competitors: ESPNCompetitor[];
  venue: {
    id: string;
    fullName: string;
    address: {
      city: string;
      state: string;
    };
  };
  broadcasts: any[];
  notes: Array<{
    headline: string;
  }>;
}

export interface ESPNCompetitor {
  id: string;
  homeAway: 'home' | 'away';
  winner: boolean;
  score: string;
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    name: string;
    location: string;
    color: string;
    alternateColor: string;
    logo: string;
    record: {
      items: Array<{
        summary: string;
        stats: Array<{
          name: string;
          value: number;
        }>;
      }>;
    };
  };
  statistics: any[];
}

// Live Data Types for Real-time Updates
export interface LiveGameUpdate {
  gameId: string;
  timestamp: Date;
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  possession?: string;
  lastPlay?: string;
  status: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  description: string;
  published: Date;
  author?: string;
  source: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  relatedTeams?: string[];
  relatedPlayers?: string[];
}

export interface InjuryReport {
  playerId: string;
  playerName: string;
  teamId: string;
  position: string;
  injury: string;
  status: 'Out' | 'Doubtful' | 'Questionable' | 'Probable' | 'Healthy';
  dateInjured?: Date;
  expectedReturn?: Date;
  description?: string;
}

// Analytics Types
export interface TeamAnalytics {
  teamId: string;
  offensiveRating: number;
  defensiveRating: number;
  specialTeamsRating: number;
  strengthOfSchedule: number;
  powerRanking: number;
  
  // Advanced metrics
  expectedWins: number;
  pythagoreanWins: number;
  srs: number; // Simple Rating System
  sos: number; // Strength of Schedule
  
  // Efficiency stats
  offensiveEfficiency: number;
  defensiveEfficiency: number;
  turnoverDifferential: number;
  redZoneEfficiency: number;
  thirdDownConversion: number;
}

export interface PlayerAnalytics {
  playerId: string;
  
  // Efficiency metrics
  qbr?: number; // Quarterback Rating
  pff_grade?: number; // Pro Football Focus Grade
  epa?: number; // Expected Points Added
  cpoe?: number; // Completion Percentage Over Expected
  
  // Advanced stats
  airYards?: number;
  yac?: number; // Yards After Catch
  pressureRate?: number;
  targetShare?: number;
  snapCount?: number;
  
  // Situational stats
  redZoneStats?: any;
  thirdDownStats?: any;
  clutchPerformance?: number;
}

// User Interface Types
export interface UIPreferences {
  theme: 'dark' | 'light' | 'auto';
  favoriteTeam?: string;
  notifications: {
    gameStart: boolean;
    scores: boolean;
    injuries: boolean;
    news: boolean;
  };
  autoRefresh: boolean;
  refreshInterval: number;
}

export interface DashboardCard {
  id: string;
  title: string;
  type: 'game' | 'stat' | 'news' | 'prediction';
  data: any;
  priority: number;
  isVisible: boolean;
}

// API State Management Types
export interface APIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  ttl: number;
}

// Utility Types
export type GameStatus = Game['status'];
export type PlayerPosition = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF' | 'OL' | 'DL' | 'LB' | 'DB';
export type Conference = 'AFC' | 'NFC';
export type Division = 'AFC East' | 'AFC North' | 'AFC South' | 'AFC West' | 'NFC East' | 'NFC North' | 'NFC South' | 'NFC West';

// Response wrappers
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}