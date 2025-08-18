// src/lib/espn.ts
export type TeamBasic = {
  id: string;      // ESPN numeric id, e.g. "4"
  abbr: string;    // "BUF"
  city: string;    // "Buffalo"
  name: string;    // "Bills"
  display: string; // "Buffalo Bills"
  logo: string;    // bevorzugt /teams/BUF.png, fallback ESPN
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
};

const ESPN_SITE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const ESPN_CORE = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl";

export function currentNflSeasonYear(date = new Date()): number {
  // NFL: regulär Sep–Feb -> Year, Jan/Feb zählen noch fürs Vorjahr
  const y = date.getFullYear();
  const m = date.getMonth(); // 0..11
  return m >= 2 ? y : y - 1;
}

function localLogo(abbr: string) {
  return `/teams/${abbr.toUpperCase()}.png`;
}
function espnCdnLogo(abbr: string) {
  return `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`;
}

export async function fetchTeams(): Promise<TeamBasic[]> {
  const res = await fetch(`${ESPN_SITE}/teams`, { cache: "no-store" });
  if (!res.ok) throw new Error(`ESPN teams failed: ${res.status}`);
  const json = await res.json();
  const raw = (json?.sports?.[0]?.leagues?.[0]?.teams ?? []).map((t: any) => t.team);

  const teams: TeamBasic[] = raw.map((t: any) => {
    const abbr: string = t.abbreviation;
    return {
      id: String(t.id),
      abbr,
      city: t.location,
      name: t.name,
      display: t.displayName,
      logo: localLogo(abbr) || espnCdnLogo(abbr),
    };
  });

  return teams.sort((a, b) => a.display.localeCompare(b.display));
}

export async function fetchRoster(teamEspnId: string, year = currentNflSeasonYear()): Promise<Athlete[]> {
  const url = `${ESPN_CORE}/seasons/${year}/teams/${teamEspnId}/athletes?limit=200`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`ESPN roster failed(${teamEspnId}): ${res.status}`);
  const json = await res.json();
  const items: string[] = (json?.items ?? []).map((it: any) => it.$ref || it.href).filter(Boolean);

  // detail calls (batchen)
  const chunk = <T,>(arr: T[], n = 25) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
  const results: Athlete[] = [];
  for (const batch of chunk(items, 25)) {
    const list = await Promise.all(
      batch.map(async (href) => {
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
        } as Athlete;
      })
    );
    results.push(...(list.filter(Boolean) as Athlete[]));
  }

  // Sort: Position -> Jersey
  const order = ["QB","RB","WR","TE","FB","LT","LG","C","RG","RT","OL","DE","DT","NT","EDGE","LB","OLB","MLB","ILB","CB","S","FS","SS","DB","K","P","LS","KR","PR"];
  const posIdx = (p?: string) => (p ? order.indexOf(p) : 9999);

  return results.sort((a, b) => {
    const pa = posIdx(a.position);
    const pb = posIdx(b.position);
    if (pa !== pb) return pa - pb;
    const ja = parseInt(a.jersey || "9999", 10);
    const jb = parseInt(b.jersey || "9999", 10);
    return ja - jb;
  });
}

export async function fetchTodayScoreboard() {
  const res = await fetch(`${ESPN_SITE}/scoreboard`, { cache: "no-store" });
  if (!res.ok) throw new Error(`ESPN scoreboard failed: ${res.status}`);
  return res.json();
}

// League-Leaders (einfacher Knoten, reicht für Top-Listen)
export async function fetchLeaders(year = currentNflSeasonYear(), category = "passingYards") {
  const res = await fetch(`${ESPN_SITE}/leaders?season=${year}&category=${category}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`ESPN leaders failed: ${res.status}`);
  return res.json();
}
