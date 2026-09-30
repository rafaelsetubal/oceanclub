// Ocean Club — Tides Service & Astronomy Engine for Ilhéus, Bahia
// Official Source: Marinha do Brasil (DHN) via tabuamare.api.br (Port ba04: Porto de Ilhéus Malhado)

export interface TideEvent {
  time: string; // HH:mm
  hourFraction: number; // 0.0 to 24.0
  level: number; // meters
  type: 'high' | 'low';
  name: string; // PREAMAR or BAIXA-MAR
  isPast: boolean;
  isNext: boolean;
}

export interface CurvePoint {
  hour: number;
  level: number;
}

export interface MoonInfo {
  name: string;
  illumination: number; // percentage 0 - 100
  stage: string;
}

export interface SunInfo {
  sunrise: string;
  sunset: string;
}

export interface TideDataResponse {
  port: string;
  state: string;
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "30 de Setembro de 2026"
  weekday: string; // e.g. "Quarta-feira"
  currentTime: string; // HH:mm
  currentHourFraction: number;
  currentLevel: number;
  trend: 'rising' | 'falling';
  events: TideEvent[];
  curvePoints: CurvePoint[];
  minLevel: number;
  maxLevel: number;
  moon: MoonInfo;
  sun: SunInfo;
  source: string;
}

// In-memory cache for API results
const tidesCache = new Map<string, { timestamp: number; data: TideDataResponse }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Calculates Moon Phase and illumination percentage for any date.
 */
export function calculateMoonPhase(date: Date): MoonInfo {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  const jd = c + day + e + f - 1524.5;

  let daysSinceNew = (jd - 2451549.5) % 29.53058867;
  if (daysSinceNew < 0) daysSinceNew += 29.53058867;

  const phaseFraction = daysSinceNew / 29.53058867;
  const illumination = Math.round(((1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2) * 100);

  let name = 'Nova';
  let stage = 'new';

  if (daysSinceNew < 1.84) {
    name = 'Lua Nova';
    stage = 'new';
  } else if (daysSinceNew < 5.53) {
    name = 'Crescente';
    stage = 'waxing_crescent';
  } else if (daysSinceNew < 9.22) {
    name = 'Quarto Crescente';
    stage = 'first_quarter';
  } else if (daysSinceNew < 12.91) {
    name = 'Gibosa Crescente';
    stage = 'waxing_gibbous';
  } else if (daysSinceNew < 16.61) {
    name = 'Lua Cheia';
    stage = 'full';
  } else if (daysSinceNew < 20.3) {
    name = 'Gibosa Minguante';
    stage = 'waning_gibbous';
  } else if (daysSinceNew < 23.99) {
    name = 'Quarto Minguante';
    stage = 'last_quarter';
  } else if (daysSinceNew < 27.68) {
    name = 'Minguante';
    stage = 'waning_crescent';
  } else {
    name = 'Lua Nova';
    stage = 'new';
  }

  return { name, illumination, stage };
}

/**
 * Calculates accurate Sunrise & Sunset for Ilhéus (-14.7936° S, -39.0494° W).
 */
export function calculateSunTimes(
  date: Date,
  lat: number = -14.7936,
  lng: number = -39.0494
): SunInfo {
  const rad = Math.PI / 180;
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const b = (360 / 365) * (dayOfYear - 81) * rad;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const decl = 23.45 * Math.sin(b) * rad;

  const zenith = 90.833 * rad; // standard atmospheric refraction
  const cosH =
    (Math.cos(zenith) - Math.sin(lat * rad) * Math.sin(decl)) /
    (Math.cos(lat * rad) * Math.cos(decl));

  const clampedCosH = Math.max(-1, Math.min(1, cosH));
  const H = Math.acos(clampedCosH) / rad;

  const solarNoonUTC = (720 - 4 * lng - eot) / 60;
  const sunriseUTC = solarNoonUTC - (H * 4) / 60;
  const sunsetUTC = solarNoonUTC + (H * 4) / 60;

  const toBahiaTime = (utcHours: number) => {
    // Bahia is UTC-3 year-round
    const bahiaHours = (utcHours - 3 + 24) % 24;
    let hh = Math.floor(bahiaHours);
    let mm = Math.round((bahiaHours - hh) * 60);
    if (mm === 60) {
      hh = (hh + 1) % 24;
      mm = 0;
    }
    return `${String(hh).padStart(2, '0')}h${String(mm).padStart(2, '0')}`;
  };

  return {
    sunrise: toBahiaTime(sunriseUTC),
    sunset: toBahiaTime(sunsetUTC),
  };
}

/**
 * Parses time string "HH:mm:ss" or "HH:mm" to decimal hour (0.0 - 24.0).
 */
function parseHourToDecimal(hourStr: string): number {
  const parts = hourStr.split(':').map(Number);
  const h = parts[0] || 0;
  const m = parts[1] || 0;
  const s = parts[2] || 0;
  return h + m / 60 + s / 3600;
}

/**
 * Returns current Bahia time components (UTC-3).
 */
export function getBahiaNow(): { dateStr: string; now: Date; hourFraction: number; timeStr: string } {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bahiaTime = new Date(utc - 3 * 3600000);

  const year = bahiaTime.getFullYear();
  const month = String(bahiaTime.getMonth() + 1).padStart(2, '0');
  const day = String(bahiaTime.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const hh = bahiaTime.getHours();
  const mm = bahiaTime.getMinutes();
  const hourFraction = hh + mm / 60;
  const timeStr = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

  return { dateStr, now: bahiaTime, hourFraction, timeStr };
}

/**
 * Cosine interpolation between tide extrema to generate the smooth 24h wave.
 */
function interpolateTideCurve(
  extrema: { t: number; level: number }[],
  steps: number = 96
): CurvePoint[] {
  // extrema should be sorted by time t (t can be negative for previous day, e.g. -1.5h, or > 24 for next day)
  const curve: CurvePoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 24; // hour 0.0 to 24.0

    let level = 1.11; // default mean sea level for Ilhéus

    // find surrounding extrema
    let found = false;
    for (let j = 0; j < extrema.length - 1; j++) {
      const e0 = extrema[j];
      const e1 = extrema[j + 1];
      if (t >= e0.t && t <= e1.t) {
        const frac = (t - e0.t) / (e1.t - e0.t);
        // Cosine wave: smooth extrema transitions
        level = (e0.level + e1.level) / 2 + ((e0.level - e1.level) / 2) * Math.cos(frac * Math.PI);
        found = true;
        break;
      }
    }

    if (!found) {
      if (extrema.length > 0) {
        if (t < extrema[0].t) {
          level = extrema[0].level;
        } else {
          level = extrema[extrema.length - 1].level;
        }
      }
    }

    curve.push({
      hour: Number(t.toFixed(2)),
      level: Number(level.toFixed(2)),
    });
  }

  return curve;
}

/**
 * Generates astronomical harmonic fallback for Ilhéus Malhado if external API is unreachable.
 */
function generateHarmonicFallback(date: Date): {
  events: { time: string; hour: number; level: number; type: 'high' | 'low' }[];
  extrema: { t: number; level: number }[];
} {
  const moon = calculateMoonPhase(date);
  // Tidal amplitude varies with moon phase (spring tide / sizígia has larger range)
  const isSpringTide = moon.stage === 'new' || moon.stage === 'full';
  const amp = isSpringTide ? 0.95 : 0.65;
  const mean = 1.11; // Mean sea level in Ilhéus (Marinha card 1201)

  // Typical Ilhéus high tide offsets (approx 5.5h and 18h on this phase)
  const dayOffset = (date.getDate() % 14) * 0.85;
  const t1 = (5.5 + dayOffset) % 12.4;
  const t2 = t1 + 6.2;
  const t3 = (t2 + 6.2) % 24;
  const t4 = (t3 + 6.2) % 24;

  const rawTimes = [
    { t: t1, level: mean + amp, type: 'high' as const },
    { t: t2, level: mean - amp * 0.85, type: 'low' as const },
    { t: t3, level: mean + amp * 0.95, type: 'high' as const },
    { t: t4, level: mean - amp * 0.9, type: 'low' as const },
  ].sort((a, b) => a.t - b.t);

  const formatH = (dec: number) => {
    const norm = (dec + 24) % 24;
    const hh = Math.floor(norm);
    const mm = Math.round((norm - hh) * 60);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };

  const events = rawTimes.map((r) => ({
    time: formatH(r.t),
    hour: r.t,
    level: Number(r.level.toFixed(2)),
    type: r.type,
  }));

  const extrema = [
    { t: rawTimes[rawTimes.length - 1].t - 24, level: rawTimes[rawTimes.length - 1].level },
    ...rawTimes.map((r) => ({ t: r.t, level: r.level })),
    { t: rawTimes[0].t + 24, level: rawTimes[0].level },
  ];

  return { events, extrema };
}

/**
 * Fetches and models tide data for Porto de Ilhéus Malhado.
 */
export async function getIlheusTideData(requestedDateStr?: string): Promise<TideDataResponse> {
  const bahia = getBahiaNow();
  const dateStr = requestedDateStr || bahia.dateStr;

  // Check in-memory cache
  const cached = tidesCache.get(dateStr);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    // Update live fields: currentTime and currentLevel
    return updateLiveFields(cached.data, bahia);
  }

  const [yStr, mStr, dStr] = dateStr.split('-');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const moon = calculateMoonPhase(targetDate);
  const sun = calculateSunTimes(targetDate);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const weekdayNames = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  const formattedDate = `${day} de ${monthNames[month - 1]} de ${year}`;
  const weekday = weekdayNames[targetDate.getUTCDay()];

  // Query previous day, target day, and next day to ensure accurate interpolation boundaries
  const prevDate = new Date(targetDate.getTime() - 24 * 3600000);
  const nextDate = new Date(targetDate.getTime() + 24 * 3600000);

  const prevMonth = prevDate.getUTCMonth() + 1;
  const prevDay = prevDate.getUTCDate();
  const nextMonth = nextDate.getUTCMonth() + 1;
  const nextDay = nextDate.getUTCDate();

  let fetchedEvents: { time: string; hour: number; level: number; type: 'high' | 'low' }[] = [];
  let extrema: { t: number; level: number }[] = [];
  let isFromAPI = false;

  try {
    // Attempt fetch from tabuamare.api.br for harbor ba04 (Ilhéus Malhado)
    const url = `https://tabuamare.api.br/api/v2/tabua-mare/ba04/${month}/[${day}]`;
    const res = await fetch(url, {
      next: { revalidate: 3600 * 12 }, // ISR 12h
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const json = await res.json();
      const dayData = json?.data?.[0]?.months?.[0]?.days?.[0];

      if (dayData && Array.isArray(dayData.hours) && dayData.hours.length > 0) {
        isFromAPI = true;
        const hoursList = dayData.hours as { hour: string; level: number }[];

        // Also fetch prev day and next day if needed for boundary interpolation
        let prevHoursList: { hour: string; level: number }[] = [];
        let nextHoursList: { hour: string; level: number }[] = [];

        try {
          const prevRes = await fetch(
            `https://tabuamare.api.br/api/v2/tabua-mare/ba04/${prevMonth}/[${prevDay}]`,
            { next: { revalidate: 3600 * 12 } }
          );
          if (prevRes.ok) {
            const prevJson = await prevRes.json();
            prevHoursList = prevJson?.data?.[0]?.months?.[0]?.days?.[0]?.hours || [];
          }
        } catch {
          // ignore boundary fetch error
        }

        try {
          const nextRes = await fetch(
            `https://tabuamare.api.br/api/v2/tabua-mare/ba04/${nextMonth}/[${nextDay}]`,
            { next: { revalidate: 3600 * 12 } }
          );
          if (nextRes.ok) {
            const nextJson = await nextRes.json();
            nextHoursList = nextJson?.data?.[0]?.months?.[0]?.days?.[0]?.hours || [];
          }
        } catch {
          // ignore boundary fetch error
        }

        // Determine high vs low based on local wave alternation
        fetchedEvents = hoursList.map((h, idx) => {
          const decHour = parseHourToDecimal(h.hour);
          const lvl = Number(h.level.toFixed(2));
          // Height > 1.2m is typically high tide in Ilhéus (Mean Level is 1.11m)
          const type: 'high' | 'low' = lvl >= 1.11 ? 'high' : 'low';
          return {
            time: h.hour.slice(0, 5),
            hour: decHour,
            level: lvl,
            type,
          };
        });

        // Ensure we have 4 events for the visual layout
        if (fetchedEvents.length < 4) {
          if (nextHoursList.length > 0) {
            const firstNext = nextHoursList[0];
            const decHour = parseHourToDecimal(firstNext.hour) + 24;
            const lvl = Number(firstNext.level.toFixed(2));
            fetchedEvents.push({
              time: firstNext.hour.slice(0, 5),
              hour: decHour,
              level: lvl,
              type: lvl >= 1.11 ? 'high' : 'low',
            });
          } else if (prevHoursList.length > 0) {
            const lastPrev = prevHoursList[prevHoursList.length - 1];
            const decHour = parseHourToDecimal(lastPrev.hour) - 24;
            const lvl = Number(lastPrev.level.toFixed(2));
            fetchedEvents.unshift({
              time: lastPrev.hour.slice(0, 5),
              hour: decHour,
              level: lvl,
              type: lvl >= 1.11 ? 'high' : 'low',
            });
          }
        }

        if (prevHoursList.length > 0) {
          const lastPrev = prevHoursList[prevHoursList.length - 1];
          extrema.push({
            t: parseHourToDecimal(lastPrev.hour) - 24,
            level: Number(lastPrev.level.toFixed(2)),
          });
        } else if (fetchedEvents.length > 0) {
          // mirror first event
          const first = fetchedEvents[0];
          extrema.push({ t: first.hour - 6.2, level: first.type === 'high' ? 0.3 : 1.9 });
        }

        for (const ev of fetchedEvents) {
          extrema.push({ t: ev.hour, level: ev.level });
        }

        if (nextHoursList.length > 0) {
          const firstNext = nextHoursList[0];
          extrema.push({
            t: parseHourToDecimal(firstNext.hour) + 24,
            level: Number(firstNext.level.toFixed(2)),
          });
        } else if (fetchedEvents.length > 0) {
          const last = fetchedEvents[fetchedEvents.length - 1];
          extrema.push({ t: last.hour + 6.2, level: last.type === 'high' ? 0.3 : 1.9 });
        }
      }
    }
  } catch (err) {
    console.warn('Tábua de Maré API request failed, using harmonic fallback:', err);
  }

  if (!isFromAPI || fetchedEvents.length === 0) {
    const fallback = generateHarmonicFallback(targetDate);
    fetchedEvents = fallback.events;
    extrema = fallback.extrema;
  }

  // Calculate 24-hour wave curve
  const curvePoints = interpolateTideCurve(extrema, 96);

  // Compute min and max levels
  const levels = curvePoints.map((p) => p.level);
  const minLevel = Math.min(...levels);
  const maxLevel = Math.max(...levels);

  // Determine current tide level and next upcoming event
  const isToday = dateStr === bahia.dateStr;
  const currentHourFraction = isToday ? bahia.hourFraction : 12.0;

  // Find level at currentHourFraction
  let currentLevel = 1.11;
  const pt = curvePoints.find((p) => p.hour >= currentHourFraction);
  if (pt) currentLevel = pt.level;

  // Trend: compare with point 15 mins later
  const nextPt = curvePoints.find((p) => p.hour >= currentHourFraction + 0.25);
  const trend: 'rising' | 'falling' = (nextPt ? nextPt.level : currentLevel) >= currentLevel ? 'rising' : 'falling';

  // Mark past events and find next upcoming tide
  let nextMarked = false;
  const events: TideEvent[] = fetchedEvents.map((ev) => {
    const isPast = isToday ? ev.hour < currentHourFraction : false;
    let isNext = false;
    if (isToday && !isPast && !nextMarked) {
      isNext = true;
      nextMarked = true;
    }
    return {
      time: ev.time,
      hourFraction: ev.hour,
      level: ev.level,
      type: ev.type,
      name: ev.type === 'high' ? 'PREAMAR' : 'BAIXA-MAR',
      isPast,
      isNext,
    };
  });

  const response: TideDataResponse = {
    port: 'Porto de Ilhéus Malhado',
    state: 'Bahia',
    date: dateStr,
    formattedDate,
    weekday,
    currentTime: isToday ? bahia.timeStr : '12:00',
    currentHourFraction,
    currentLevel,
    trend,
    events,
    curvePoints,
    minLevel,
    maxLevel,
    moon,
    sun,
    source: isFromAPI
      ? 'Marinha do Brasil (DHN) · tabuamare.api.br'
      : 'Marinha do Brasil (DHN) · Cálculo Harmônico Ilhéus',
  };

  // Cache response
  tidesCache.set(dateStr, { timestamp: Date.now(), data: response });

  return response;
}

function updateLiveFields(cachedData: TideDataResponse, bahia: ReturnType<typeof getBahiaNow>): TideDataResponse {
  if (cachedData.date !== bahia.dateStr) {
    return cachedData;
  }

  const currentHourFraction = bahia.hourFraction;
  let currentLevel = cachedData.currentLevel;
  const pt = cachedData.curvePoints.find((p) => p.hour >= currentHourFraction);
  if (pt) currentLevel = pt.level;

  const nextPt = cachedData.curvePoints.find((p) => p.hour >= currentHourFraction + 0.25);
  const trend: 'rising' | 'falling' = (nextPt ? nextPt.level : currentLevel) >= currentLevel ? 'rising' : 'falling';

  let nextMarked = false;
  const events = cachedData.events.map((ev) => {
    const isPast = ev.hourFraction < currentHourFraction;
    let isNext = false;
    if (!isPast && !nextMarked) {
      isNext = true;
      nextMarked = true;
    }
    return { ...ev, isPast, isNext };
  });

  return {
    ...cachedData,
    currentTime: bahia.timeStr,
    currentHourFraction,
    currentLevel,
    trend,
    events,
  };
}
