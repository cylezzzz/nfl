// src/data/mockData.ts - Updated for 2025/26 NFL Season
import { Team, Player, Game, Prediction } from '../types';

// NFL Saison 2025/26 - Early Season Standings (September 2025)
export const teams: Team[] = [
  // --- AFC East ---
  {
    id: 'buf',
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#00338D',
    secondaryColor: '#C60C30',
    logo: '/teams/BUF.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'mia',
    name: 'Dolphins',
    city: 'Miami',
    abbreviation: 'MIA',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#008E97',
    secondaryColor: '#FC4C02',
    logo: '/teams/MIA.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'ne',
    name: 'Patriots',
    city: 'New England',
    abbreviation: 'NE',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#002244',
    secondaryColor: '#C60C30',
    logo: '/teams/NE.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'nyj',
    name: 'Jets',
    city: 'New York',
    abbreviation: 'NYJ',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#125740',
    secondaryColor: '#000000',
    logo: '/teams/NYJ.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- AFC North ---
  {
    id: 'bal',
    name: 'Ravens',
    city: 'Baltimore',
    abbreviation: 'BAL',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#241773',
    secondaryColor: '#000000',
    logo: '/teams/BAL.png',
    wins: 3, losses: 0, ties: 0
  },
  {
    id: 'cin',
    name: 'Bengals',
    city: 'Cincinnati',
    abbreviation: 'CIN',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#FB4F14',
    secondaryColor: '#000000',
    logo: '/teams/CIN.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'cle',
    name: 'Browns',
    city: 'Cleveland',
    abbreviation: 'CLE',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#311D00',
    secondaryColor: '#FF3C00',
    logo: '/teams/CLE.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'pit',
    name: 'Steelers',
    city: 'Pittsburgh',
    abbreviation: 'PIT',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#FFB612',
    secondaryColor: '#101820',
    logo: '/teams/PIT.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- AFC South ---
  {
    id: 'hou',
    name: 'Texans',
    city: 'Houston',
    abbreviation: 'HOU',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#03202F',
    secondaryColor: '#A71930',
    logo: '/teams/HOU.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'ind',
    name: 'Colts',
    city: 'Indianapolis',
    abbreviation: 'IND',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#002C5F',
    secondaryColor: '#A2AAAD',
    logo: '/teams/IND.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'jax',
    name: 'Jaguars',
    city: 'Jacksonville',
    abbreviation: 'JAX',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#006778',
    secondaryColor: '#D7A22A',
    logo: '/teams/JAX.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'ten',
    name: 'Titans',
    city: 'Tennessee',
    abbreviation: 'TEN',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#4B92DB',
    secondaryColor: '#002244',
    logo: '/teams/TEN.png',
    wins: 0, losses: 3, ties: 0
  },

  // --- AFC West ---
  {
    id: 'den',
    name: 'Broncos',
    city: 'Denver',
    abbreviation: 'DEN',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#FB4F14',
    secondaryColor: '#002244',
    logo: '/teams/DEN.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'kc',
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#E31837',
    secondaryColor: '#FFB612',
    logo: '/teams/KC.png',
    wins: 3, losses: 0, ties: 0
  },
  {
    id: 'lv',
    name: 'Raiders',
    city: 'Las Vegas',
    abbreviation: 'LV',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#000000',
    secondaryColor: '#A5ACAF',
    logo: '/teams/LV.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'lac',
    name: 'Chargers',
    city: 'Los Angeles',
    abbreviation: 'LAC',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#0080C6',
    secondaryColor: '#FFC20E',
    logo: '/teams/LAC.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- NFC East ---
  {
    id: 'dal',
    name: 'Cowboys',
    city: 'Dallas',
    abbreviation: 'DAL',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#003594',
    secondaryColor: '#869397',
    logo: '/teams/DAL.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'nyg',
    name: 'Giants',
    city: 'New York',
    abbreviation: 'NYG',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#0B2265',
    secondaryColor: '#A71930',
    logo: '/teams/NYG.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'phi',
    name: 'Eagles',
    city: 'Philadelphia',
    abbreviation: 'PHI',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#004C54',
    secondaryColor: '#A5ACAF',
    logo: '/teams/PHI.png',
    wins: 3, losses: 0, ties: 0
  },
  {
    id: 'was',
    name: 'Commanders',
    city: 'Washington',
    abbreviation: 'WAS',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#773141',
    secondaryColor: '#FFB612',
    logo: '/teams/WAS.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- NFC North ---
  {
    id: 'chi',
    name: 'Bears',
    city: 'Chicago',
    abbreviation: 'CHI',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#0B162A',
    secondaryColor: '#C83803',
    logo: '/teams/CHI.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'det',
    name: 'Lions',
    city: 'Detroit',
    abbreviation: 'DET',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#0076B6',
    secondaryColor: '#B0B7BC',
    logo: '/teams/DET.png',
    wins: 3, losses: 0, ties: 0
  },
  {
    id: 'gb',
    name: 'Packers',
    city: 'Green Bay',
    abbreviation: 'GB',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#203731',
    secondaryColor: '#FFB612',
    logo: '/teams/GB.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'min',
    name: 'Vikings',
    city: 'Minnesota',
    abbreviation: 'MIN',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#4F2683',
    secondaryColor: '#FFC62F',
    logo: '/teams/MIN.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- NFC South ---
  {
    id: 'atl',
    name: 'Falcons',
    city: 'Atlanta',
    abbreviation: 'ATL',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#A71930',
    secondaryColor: '#000000',
    logo: '/teams/ATL.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'car',
    name: 'Panthers',
    city: 'Carolina',
    abbreviation: 'CAR',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#0085CA',
    secondaryColor: '#101820',
    logo: '/teams/CAR.png',
    wins: 0, losses: 3, ties: 0
  },
  {
    id: 'no',
    name: 'Saints',
    city: 'New Orleans',
    abbreviation: 'NO',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#D3BC8D',
    secondaryColor: '#101820',
    logo: '/teams/NO.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'tb',
    name: 'Buccaneers',
    city: 'Tampa Bay',
    abbreviation: 'TB',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#D50A0A',
    secondaryColor: '#34302B',
    logo: '/teams/TB.png',
    wins: 2, losses: 1, ties: 0
  },

  // --- NFC West ---
  {
    id: 'ari',
    name: 'Cardinals',
    city: 'Arizona',
    abbreviation: 'ARI',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#97233F',
    secondaryColor: '#000000',
    logo: '/teams/ARI.png',
    wins: 1, losses: 2, ties: 0
  },
  {
    id: 'lar',
    name: 'Rams',
    city: 'Los Angeles',
    abbreviation: 'LAR',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#003594',
    secondaryColor: '#FFA300',
    logo: '/teams/LAR.png',
    wins: 2, losses: 1, ties: 0
  },
  {
    id: 'sf',
    name: '49ers',
    city: 'San Francisco',
    abbreviation: 'SF',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#AA0000',
    secondaryColor: '#B3995D',
    logo: '/teams/SF.png',
    wins: 3, losses: 0, ties: 0
  },
  {
    id: 'sea',
    name: 'Seahawks',
    city: 'Seattle',
    abbreviation: 'SEA',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#002244',
    secondaryColor: '#69BE28',
    logo: '/teams/SEA.png',
    wins: 2, losses: 1, ties: 0
  }
];

// Helper function to get team by ID
const getTeam = (id: string) => teams.find(t => t.id === id)!;

// NFL Saison 2025/26 Star Players - Updated Rosters
export const players: Player[] = [
  // Quarterbacks - 2025/26 Season
  {
    id: 'allen2026',
    name: 'Josh Allen',
    position: 'QB',
    number: 17,
    teamId: 'buf',
    passingYards: 412,
    rushingYards: 67,
    touchdowns: 5
  },
  {
    id: 'jackson2026',
    name: 'Lamar Jackson',
    position: 'QB',
    number: 8,
    teamId: 'bal',
    passingYards: 389,
    rushingYards: 98,
    touchdowns: 6
  },
  {
    id: 'goff2026',
    name: 'Jared Goff',
    position: 'QB',
    number: 16,
    teamId: 'det',
    passingYards: 445,
    touchdowns: 4
  },
  {
    id: 'mahomes2026',
    name: 'Patrick Mahomes',
    position: 'QB',
    number: 15,
    teamId: 'kc',
    passingYards: 423,
    touchdowns: 5
  },
  {
    id: 'hurts2026',
    name: 'Jalen Hurts',
    position: 'QB',
    number: 1,
    teamId: 'phi',
    passingYards: 378,
    rushingYards: 89,
    touchdowns: 4
  },
  {
    id: 'purdy2026',
    name: 'Brock Purdy',
    position: 'QB',
    number: 13,
    teamId: 'sf',
    passingYards: 456,
    touchdowns: 6
  },

  // Running Backs - 2025/26 Season
  {
    id: 'barkley2026',
    name: 'Saquon Barkley',
    position: 'RB',
    number: 26,
    teamId: 'phi',
    rushingYards: 234,
    receivingYards: 67,
    touchdowns: 3
  },
  {
    id: 'henry2026',
    name: 'Derrick Henry',
    position: 'RB',
    number: 22,
    teamId: 'bal',
    rushingYards: 198,
    touchdowns: 2
  },
  {
    id: 'gibbs2026',
    name: 'Jahmyr Gibbs',
    position: 'RB',
    number: 26,
    teamId: 'det',
    rushingYards: 189,
    receivingYards: 78,
    touchdowns: 2
  },

  // Wide Receivers - 2025/26 Season
  {
    id: 'chase2026',
    name: 'Ja\'Marr Chase',
    position: 'WR',
    number: 1,
    teamId: 'cin',
    receivingYards: 267,
    touchdowns: 3
  },
  {
    id: 'jefferson2026',
    name: 'Justin Jefferson',
    position: 'WR',
    number: 18,
    teamId: 'min',
    receivingYards: 245,
    touchdowns: 2
  },
  {
    id: 'stbrown2026',
    name: 'Amon-Ra St. Brown',
    position: 'WR',
    number: 14,
    teamId: 'det',
    receivingYards: 223,
    touchdowns: 2
  },
  {
    id: 'deebo2026',
    name: 'Deebo Samuel',
    position: 'WR',
    number: 19,
    teamId: 'sf',
    receivingYards: 234,
    touchdowns: 3
  },

  // Tight Ends
  {
    id: 'kelce2026',
    name: 'Travis Kelce',
    position: 'TE',
    number: 87,
    teamId: 'kc',
    receivingYards: 189,
    touchdowns: 2
  },
  {
    id: 'laporta2026',
    name: 'Sam LaPorta',
    position: 'TE',
    number: 87,
    teamId: 'det',
    receivingYards: 156,
    touchdowns: 1
  }
];

// Week 4 NFL Games - September 2025
export const todaysGames: Game[] = [
  {
    id: 'week4_game1',
    homeTeam: getTeam('kc'),
    awayTeam: getTeam('lac'),
    date: '2025-09-29',
    time: '13:00',
    week: 4,
    season: 2025,
    status: 'scheduled',
    venue: 'Arrowhead Stadium',
    winProbability: {
      home: 72,
      away: 28
    }
  },
  {
    id: 'week4_game2',
    homeTeam: getTeam('det'),
    awayTeam: getTeam('sea'),
    date: '2025-09-29',
    time: '13:00',
    week: 4,
    season: 2025,
    status: 'scheduled',
    venue: 'Ford Field',
    winProbability: {
      home: 65,
      away: 35
    }
  },
  {
    id: 'week4_game3',
    homeTeam: getTeam('phi'),
    awayTeam: getTeam('dal'),
    date: '2025-09-29',
    time: '16:25',
    week: 4,
    season: 2025,
    status: 'scheduled',
    venue: 'Lincoln Financial Field',
    winProbability: {
      home: 58,
      away: 42
    }
  },
  {
    id: 'week4_game4',
    homeTeam: getTeam('sf'),
    awayTeam: getTeam('lar'),
    date: '2025-09-29',
    time: '20:20',
    week: 4,
    season: 2025,
    status: 'scheduled',
    venue: 'Levi\'s Stadium',
    winProbability: {
      home: 61,
      away: 39
    }
  }
];

// Recent Week 3 Results
export const recentGames: Game[] = [
  {
    id: 'week3_game1',
    homeTeam: getTeam('bal'),
    awayTeam: getTeam('cin'),
    date: '2025-09-22',
    time: '13:00',
    week: 3,
    season: 2025,
    homeScore: 28,
    awayScore: 21,
    status: 'completed',
    venue: 'M&T Bank Stadium'
  },
  {
    id: 'week3_game2',
    homeTeam: getTeam('buf'),
    awayTeam: getTeam('ne'),
    date: '2025-09-22',
    time: '13:00',
    week: 3,
    season: 2025,
    homeScore: 31,
    awayScore: 14,
    status: 'completed',
    venue: 'Highmark Stadium'
  },
  {
    id: 'week3_game3',
    homeTeam: getTeam('sf'),
    awayTeam: getTeam('ari'),
    date: '2025-09-22',
    time: '16:25',
    week: 3,
    season: 2025,
    homeScore: 24,
    awayScore: 17,
    status: 'completed',
    venue: 'Levi\'s Stadium'
  }
];

// Week 4 Predictions
export const predictions: Prediction[] = [
  {
    gameId: 'week4_game1',
    homeWinProbability: 72,
    awayWinProbability: 28,
    predictedScore: {
      home: 27,
      away: 17
    },
    confidence: 84,
    factors: [
      'Kansas City\'s undefeated start (3-0)',
      'Home field advantage at Arrowhead',
      'Mahomes vs Herbert matchup favors KC',
      'Chargers\' road struggles in division games'
    ]
  },
  {
    gameId: 'week4_game2',
    homeWinProbability: 65,
    awayWinProbability: 35,
    predictedScore: {
      home: 24,
      away: 20
    },
    confidence: 78,
    factors: [
      'Detroit\'s perfect 3-0 start',
      'Lions\' explosive offensive weapons',
      'Seattle\'s inconsistent road performance',
      'Home dome advantage for Detroit'
    ]
  },
  {
    gameId: 'week4_game3',
    homeWinProbability: 58,
    awayWinProbability: 42,
    predictedScore: {
      home: 23,
      away: 20
    },
    confidence: 71,
    factors: [
      'NFC East divisional rivalry intensity',
      'Philadelphia\'s strong running game',
      'Dallas showing improvement in Week 3',
      'Eagles\' home field advantage'
    ]
  },
  {
    gameId: 'week4_game4',
    homeWinProbability: 61,
    awayWinProbability: 39,
    predictedScore: {
      home: 26,
      away: 21
    },
    confidence: 76,
    factors: [
      'San Francisco\'s perfect 3-0 record',
      'NFC West divisional knowledge advantage',
      'Rams\' offensive line concerns',
      'Sunday Night Football primetime factor'
    ]
  }
];