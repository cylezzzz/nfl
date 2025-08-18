function getFallbackTeams(): TeamBasic// src/lib/espn.ts - Enhanced Version mit besserer Error Handling und Caching
export type TeamBasic = {
  id: string;      // ESPN numeric id, e.g. "4"
  abbr: string;    // "BUF"
  city: string;    // "Buffalo"
  name: string;    // "Bills"
  display: string; // "Buffalo Bills"
  logo: string;    // bevorzugt /teams/BUF.png, fallback ESPN
  record?: string; // "13-4" für aktuelle Season
  division?: string; // "AFC East"
  conference?: string; // "AFC"
};

export type Athlete = {
  id: string;
  fullName: string;
  position?: string;
  jersey?: string;
  age?: number;
  height?: string;
  weight?: number;
  headshot?: string;
  experience?: number;
  college?: string;
};

export type GameEvent = {
  id: string;
  date: string;
  status: {
    type: {
      name: string;
      state: string;
      shortDetail: string;
    };
    period?: number;
    clock?: string;
  };
  competitions: Array<{
    competitors: Array<{
      team: {
        id: string;
        abbreviation: string;
        displayName: string;
        logo: string;
        record?: {
          items: Array<{
            summary: string;
          }>;
        };
      };
      homeAway: string;
      score: string;
      winner?: boolean;
    }>;
    venue: {
      fullName: string;
    };
    notes?: Array<{
      headline: string;
    }>;
  }>;
  week?: {
    number: number;
  };
  season?: {
    year: number;
    type: number;
  };
};

const ESPN_SITE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const ESPN_CORE = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl";

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

function getFromCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

function setCache(key: string, data: any, ttl = 5 * 60 * 1000) { // 5min default
  cache.set(key, { data, timestamp: Date.now(), ttl });
}

async function fetchWithCache(url: string, cacheKey: string, ttl?: number) {
  // Try cache first
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return cached;
  }

  // Fetch fresh data
  console.log(`🔄 Fetching: ${url}`);
  const res = await fetch(url, { 
    cache: "no-store",
    headers: {
      'User-Agent': 'NFL-Analytics-App/1.0'
    }
  });
  
  if (!res.ok) {
    throw new Error(`ESPN API failed: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  setCache(cacheKey, data, ttl);
  console.log(`✅ Cached: ${cacheKey}`);
  
  return data;
}

export function currentNflSeasonYear(date = new Date()): number {
  // NFL: regulär Sep–Feb -> Year, Jan/Feb zählen noch fürs Vorjahr
  // Für 2025/26 Season: Sep 2025 - Feb 2026
  const y = date.getFullYear();
  const m = date.getMonth(); // 0..11
  
  // Wenn wir in 2025 sind und es September oder später ist -> 2025 Season
  // Wenn wir in 2026 sind und es vor März ist -> 2025 Season
  if (y === 2025 && m >= 8) return 2025; // Sep-Dec 2025
  if (y === 2026 && m < 3) return 2025;  // Jan-Feb 2026
  
  // Standard logic für andere Jahre
  return m >= 8 ? y : y - 1;
}

function localLogo(abbr: string) {
  return `/teams/${abbr.toUpperCase()}.png`;
}

function espnCdnLogo(abbr: string) {
  return `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`;
}

export async function fetchTeams(): Promise<TeamBasic[]> {
  try {
    const json = await fetchWithCache(
      `${ESPN_SITE}/teams`, 
      'nfl_teams',
      10 * 60 * 1000 // 10min cache for teams
    );
    
    const raw = (json?.sports?.[0]?.leagues?.[0]?.teams ?? []).map((t: any) => t.team);

    const teams: TeamBasic[] = raw.map((t: any) => {
      const abbr: string = t.abbreviation;
      const record = t.record?.items?.[0]?.summary || '';
      
      return {
        id: String(t.id),
        abbr,
        city: t.location,
        name: t.name,
        display: t.displayName,
        logo: localLogo(abbr),
        record,
        division: getDivisionName(abbr),
        conference: getConferenceName(abbr),
      };
    });

    return teams.sort((a, b) => a.display.localeCompare(b.display));
  } catch (error) {
    console.error('❌ fetchTeams failed:', error);
    // Return fallback data
    return getFallbackTeams();
  }
}

function getDivisionName(abbr: string): string {
  const divisions: Record<string, string> = {
    'BUF': 'AFC East', 'MIA': 'AFC East', 'NE': 'AFC East', 'NYJ': 'AFC East',
    'BAL': 'AFC North', 'CIN': 'AFC North', 'CLE': 'AFC North', 'PIT': 'AFC North',
    'HOU': 'AFC South', 'IND': 'AFC South', 'JAX': 'AFC South', 'TEN': 'AFC South',
    'DEN': 'AFC West', 'KC': 'AFC West', 'LV': 'AFC West', 'LAC': 'AFC West',
    'DAL': 'NFC East', 'NYG': 'NFC East', 'PHI': 'NFC East', 'WAS': 'NFC East',
    'CHI': 'NFC North', 'DET': 'NFC North', 'GB': 'NFC North', 'MIN': 'NFC North',
    'ATL': 'NFC South', 'CAR': 'NFC South', 'NO': 'NFC South', 'TB': 'NFC South',
    'ARI': 'NFC West', 'LAR': 'NFC West', 'SF': 'NFC West', 'SEA': 'NFC West'
  };
  return divisions[abbr] || 'Unknown';
}

function getConferenceName(abbr: string): string {
  const afc = ['BUF', 'MIA', 'NE', 'NYJ', 'BAL', 'CIN', 'CLE', 'PIT', 'HOU', 'IND', 'JAX', 'TEN', 'DEN', 'KC', 'LV', 'LAC'];
  return afc.includes(abbr) ? 'AFC' : 'NFC';
}

function getFallbackTeams(): TeamBasic[] {
  // Fallback für alle 32 NFL Teams mit frühen 2025/26 Season Records (nach Week 3)
  return [
    { id: '1', abbr: 'ARI', city: 'Arizona', name: 'Cardinals', display: 'Arizona Cardinals', logo: '/teams/ARI.png', record: '1-2', division: 'NFC West', conference: 'NFC' },
    { id: '2', abbr: 'ATL', city: 'Atlanta', name: 'Falcons', display: 'Atlanta Falcons', logo: '/teams/ATL.png', record: '2-1', division: 'NFC South', conference: 'NFC' },
    { id: '3', abbr: 'BAL', city: 'Baltimore', name: 'Ravens', display: 'Baltimore Ravens', logo: '/teams/BAL.png', record: '3-0', division: 'AFC North', conference: 'AFC' },
    { id: '4', abbr: 'BUF', city: 'Buffalo', name: 'Bills', display: 'Buffalo Bills', logo: '/teams/BUF.png', record: '2-1', division: 'AFC East', conference: 'AFC' },
    { id: '5', abbr: 'CAR', city: 'Carolina', name: 'Panthers', display: 'Carolina Panthers', logo: '/teams/CAR.png', record: '0-3', division: 'NFC South', conference: 'NFC' },
    { id: '6', abbr: 'CHI', city: 'Chicago', name: 'Bears', display: 'Chicago Bears', logo: '/teams/CHI.png', record: '1-2', division: 'NFC North', conference: 'NFC' },
    { id: '7', abbr: 'CIN', city: 'Cincinnati', name: 'Bengals', display: 'Cincinnati Bengals', logo: '/teams/CIN.png', record: '2-1', division: 'AFC North', conference: 'AFC' },
    { id: '8', abbr: 'CLE', city: 'Cleveland', name: 'Browns', display: 'Cleveland Browns', logo: '/teams/CLE.png', record: '1-2', division: 'AFC North', conference: 'AFC' },
    { id: '9', abbr: 'DAL', city: 'Dallas', name: 'Cowboys', display: 'Dallas Cowboys', logo: '/teams/DAL.png', record: '2-1', division: 'NFC East', conference: 'NFC' },
    { id: '10', abbr: 'DEN', city: 'Denver', name: 'Broncos', display: 'Denver Broncos', logo: '/teams/DEN.png', record: '2-1', division: 'AFC West', conference: 'AFC' },
    { id: '11', abbr: 'DET', city: 'Detroit', name: 'Lions', display: 'Detroit Lions', logo: '/teams/DET.png', record: '3-0', division: 'NFC North', conference: 'NFC' },
    { id: '12', abbr: 'GB', city: 'Green Bay', name: 'Packers', display: 'Green Bay Packers', logo: '/teams/GB.png', record: '2-1', division: 'NFC North', conference: 'NFC' },
    { id: '13', abbr: 'HOU', city: 'Houston', name: 'Texans', display: 'Houston Texans', logo: '/teams/HOU.png', record: '2-1', division: 'AFC South', conference: 'AFC' },
    { id: '14', abbr: 'IND', city: 'Indianapolis', name: 'Colts', display: 'Indianapolis Colts', logo: '/teams/IND.png', record: '1-2', division: 'AFC South', conference: 'AFC' },
    { id: '15', abbr: 'JAX', city: 'Jacksonville', name: 'Jaguars', display: 'Jacksonville Jaguars', logo: '/teams/JAX.png', record: '1-2', division: 'AFC South', conference: 'AFC' },
    { id: '16', abbr: 'KC', city: 'Kansas City', name: 'Chiefs', display: 'Kansas City Chiefs', logo: '/teams/KC.png', record: '3-0', division: 'AFC West', conference: 'AFC' },
    { id: '17', abbr: 'LV', city: 'Las Vegas', name: 'Raiders', display: 'Las Vegas Raiders', logo: '/teams/LV.png', record: '1-2', division: 'AFC West', conference: 'AFC' },
    { id: '18', abbr: 'LAC', city: 'Los Angeles', name: 'Chargers', display: 'Los Angeles Chargers', logo: '/teams/LAC.png', record: '2-1', division: 'AFC West', conference: 'AFC' },
    { id: '19', abbr: 'LAR', city: 'Los Angeles', name: 'Rams', display: 'Los Angeles Rams', logo: '/teams/LAR.png', record: '2-1', division: 'NFC West', conference: 'NFC' },
    { id: '20', abbr: 'MIA', city: 'Miami', name: 'Dolphins', display: 'Miami Dolphins', logo: '/teams/MIA.png', record: '1-2', division: 'AFC East', conference: 'AFC' },
    { id: '21', abbr: 'MIN', city: 'Minnesota', name: 'Vikings', display: 'Minnesota Vikings', logo: '/teams/MIN.png', record: '2-1', division: 'NFC North', conference: 'NFC' },
    { id: '22', abbr: 'NE', city: 'New England', name: 'Patriots', display: 'New England Patriots', logo: '/teams/NE.png', record: '1-2', division: 'AFC East', conference: 'AFC' },
    { id: '23', abbr: 'NO', city: 'New Orleans', name: 'Saints', display: 'New Orleans Saints', logo: '/teams/NO.png', record: '1-2', division: 'NFC South', conference: 'NFC' },
    { id: '24', abbr: 'NYG', city: 'New York', name: 'Giants', display: 'New York Giants', logo: '/teams/NYG.png', record: '1-2', division: 'NFC East', conference: 'NFC' },
    { id: '25', abbr: 'NYJ', city: 'New York', name: 'Jets', display: 'New York Jets', logo: '/teams/NYJ.png', record: '2-1', division: 'AFC East', conference: 'AFC' },
    { id: '26', abbr: 'PHI', city: 'Philadelphia', name: 'Eagles', display: 'Philadelphia Eagles', logo: '/teams/PHI.png', record: '3-0', division: 'NFC East', conference: 'NFC' },
    { id: '27', abbr: 'PIT', city: 'Pittsburgh', name: 'Steelers', display: 'Pittsburgh Steelers', logo: '/teams/PIT.png', record: '2-1', division: 'AFC North', conference: 'AFC' },
    { id: '28', abbr: 'SF', city: 'San Francisco', name: '49ers', display: 'San Francisco 49ers', logo: '/teams/SF.png', record: '3-0', division: 'NFC West', conference: 'NFC' },
    { id: '29', abbr: 'SEA', city: 'Seattle', name: 'Seahawks', display: 'Seattle Seahawks', logo: '/teams/SEA.png', record: '2-1', division: 'NFC West', conference: 'NFC' },
    { id: '30', abbr: 'TB', city: 'Tampa Bay', name: 'Buccaneers', display: 'Tampa Bay Buccaneers', logo: '/teams/TB.png', record: '2-1', division: 'NFC South', conference: 'NFC' },
    { id: '31', abbr: 'TEN', city: 'Tennessee', name: 'Titans', display: 'Tennessee Titans', logo: '/teams/TEN.png', record: '0-3', division: 'AFC South', conference: 'AFC' },
    { id: '32', abbr: 'WAS', city: 'Washington', name: 'Commanders', display: 'Washington Commanders', logo: '/teams/WAS.png', record: '2-1', division: 'NFC East', conference: 'NFC' }
  ];
}

export async function fetchRoster(teamEspnId: string, year = currentNflSeasonYear()): Promise<Athlete[]> {
  try {
    const url = `${ESPN_CORE}/seasons/${year}/teams/${teamEspnId}/athletes?limit=200`;
    const json = await fetchWithCache(url, `roster_${teamEspnId}_${year}`, 30 * 60 * 1000); // 30min cache
    
    const items: string[] = (json?.items ?? []).map((it: any) => it.$ref || it.href).filter(Boolean);

    // Batch process athlete details (limit to avoid overwhelming API)
    const results: Athlete[] = [];
    const batchSize = 20;
    
    for (let i = 0; i < Math.min(items.length, 60); i += batchSize) { // Limit to 60 players max
      const batch = items.slice(i, i + batchSize);
      
      const promises = batch.map(async (href) => {
        try {
          const r = await fetch(href, { cache: "no-store" });
          if (!r.ok) return null;
          
          const a = await r.json();
          return {
            id: String(a.id),
            fullName: a.displayName || a.fullName || a.name,
            position: a.position?.abbreviation || a.position?.name,
            jersey: a.jersey,
            age: a.age,
            height: a.displayHeight,
            weight: a.displayWeight,
            headshot: a.headshot?.href,
            experience: a.experience?.years,
            college: a.college?.name || a.college
          } as Athlete;
        } catch (error) {
          console.error(`Failed to fetch athlete: ${href}`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(promises);
      results.push(...(batchResults.filter(Boolean) as Athlete[]));
      
      // Rate limiting
      if (i + batchSize < Math.min(items.length, 60)) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Sort by position and jersey number
    const positionOrder = ["QB","RB","WR","TE","FB","LT","LG","C","RG","RT","OL","DE","DT","NT","EDGE","LB","OLB","MLB","ILB","CB","S","FS","SS","DB","K","P","LS"];
    const getPositionIndex = (pos?: string) => pos ? positionOrder.indexOf(pos) : 9999;

    return results.sort((a, b) => {
      const posA = getPositionIndex(a.position);
      const posB = getPositionIndex(b.position);
      if (posA !== posB) return posA - posB;
      
      const jerseyA = parseInt(a.jersey || "9999", 10);
      const jerseyB = parseInt(b.jersey || "9999", 10);
      return jerseyA - jerseyB;
    });

  } catch (error) {
    console.error(`❌ fetchRoster failed for team ${teamEspnId}:`, error);
    return getFallbackRoster(teamEspnId);
  }
}

function getFallbackRoster(teamId: string): Athlete[] {
  // Basic fallback roster
  const positions = [
    { pos: 'QB', count: 2 },
    { pos: 'RB', count: 3 },
    { pos: 'WR', count: 5 },
    { pos: 'TE', count: 2 },
    { pos: 'K', count: 1 },
    { pos: 'DEF', count: 1 }
  ];

  const roster: Athlete[] = [];
  let jerseyNum = 1;

  positions.forEach(({ pos, count }) => {
    for (let i = 0; i < count; i++) {
      roster.push({
        id: `${teamId}_${pos}_${i}`,
        fullName: `${pos} Player ${i + 1}`,
        position: pos,
        jersey: String(jerseyNum++),
        age: 20 + Math.floor(Math.random() * 15),
        height: `6'${Math.floor(Math.random() * 6)}"`,
        weight: 180 + Math.floor(Math.random() * 120)
      });
    }
  });

  return roster;
}

export async function fetchTodayScoreboard(): Promise<any> {
  try {
    return await fetchWithCache(
      `${ESPN_SITE}/scoreboard`, 
      'today_scoreboard',
      60 * 1000 // 1min cache for live scores
    );
  } catch (error) {
    console.error('❌ fetchTodayScoreboard failed:', error);
    return { events: [] };
  }
}

export async function fetchLeaders(year = currentNflSeasonYear(), category = "passingYards"): Promise<any> {
  try {
    return await fetchWithCache(
      `${ESPN_SITE}/leaders?season=${year}&category=${category}`, 
      `leaders_${year}_${category}`,
      15 * 60 * 1000 // 15min cache for stats
    );
  } catch (error) {
    console.error(`❌ fetchLeaders failed for ${category}:`, error);
    return { categories: [] };
  }
}

// Utility function to clear cache (useful for debugging)
export function clearESPNCache() {
  cache.clear();
  console.log('🗑️ ESPN cache cleared');
}

// Get cache stats
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  };
}