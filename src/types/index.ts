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
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  teamId: string;
  passingYards?: number;
  rushingYards?: number;
  receivingYards?: number;
  touchdowns: number;
  tackles?: number;
  interceptions?: number;
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
  status: 'scheduled' | 'live' | 'completed';
  venue: string;
  winProbability?: {
    home: number;
    away: number;
  };
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
}

export interface Standing {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
  divisionRank: number;
  conferenceRank: number;
}