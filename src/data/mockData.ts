import { Team, Player, Game, Prediction } from '../types';

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
    wins: 11, losses: 6, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 4, losses: 13, ties: 0
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
    wins: 7, losses: 10, ties: 0
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
    wins: 13, losses: 4, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 11, losses: 6, ties: 0
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
    wins: 10, losses: 7, ties: 0
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
    wins: 10, losses: 7, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 3, losses: 14, ties: 0
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
    wins: 6, losses: 11, ties: 0
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
    wins: 10, losses: 7, ties: 0
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
    wins: 15, losses: 2, ties: 0
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
    wins: 4, losses: 13, ties: 0
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
    wins: 11, losses: 6, ties: 0
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
    wins: 12, losses: 5, ties: 0
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
    wins: 6, losses: 11, ties: 0
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
    wins: 11, losses: 6, ties: 0
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
    wins: 5, losses: 12, ties: 0
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
    wins: 7, losses: 10, ties: 0
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
    wins: 12, losses: 5, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 7, losses: 10, ties: 0
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
    wins: 7, losses: 10, ties: 0
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
    wins: 2, losses: 15, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 9, losses: 8, ties: 0
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
    wins: 4, losses: 13, ties: 0
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
    wins: 10, losses: 7, ties: 0
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
    wins: 12, losses: 5, ties: 0
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
    wins: 9, losses: 8, ties: 0
  }
];
