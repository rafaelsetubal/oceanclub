'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUp, ArrowDown, Sun, Moon, Waves, Clock, Share2, Check, RefreshCw } from 'lucide-react';
import { TideDataResponse, TideEvent } from '@/lib/tides';
import { cn } from '@/lib/utils';

interface TideChartProps {
  initialData?: TideDataResponse;
  dateStr?: string;
  showShare?: boolean;
  className?: string;
}

export function TideChart({
  initialData,
  dateStr,
  showShare = true,
  className,
}: TideChartProps) {
  const [data, setData] = useState<TideDataResponse | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [hoveredPoint, setHoveredPoint] = useState<{
    hour: number;
    level: number;
    x: number;
    y: number;
    timeFormatted: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Fetch tide data if not provided or when date changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const url = dateStr ? `/api/tides?date=${dateStr}` : '/api/tides';
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && isMounted) {
            setData(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load tides:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (!initialData || dateStr) {
      loadData();
    }
    return () => {
      isMounted = false;
    };
  }, [dateStr, initialData]);

  // Real-time ticking: refresh current Bahia time every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // Re-fetch only if viewing today's tide
      if (!dateStr) {
        fetch('/api/tides')
          .then((r) => r.json())
          .then((json) => {
            if (json.success) setData(json.data);
          })
          .catch(() => {});
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [dateStr]);

  // SVG Geometry Dimensions
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 300;
  const PADDING = { top: 40, bottom: 50, left: 40, right: 40 };
  const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;

  // Scale calculations
  const { minL, maxL, pathD, areaD, getCoords } = useMemo(() => {
    if (!data || !data.curvePoints || data.curvePoints.length === 0) {
      return { minL: 0, maxL: 2.2, pathD: '', areaD: '', getCoords: () => ({ x: 0, y: 0 }) };
    }

    const minLevelVal = Math.max(0, Math.floor((data.minLevel - 0.15) * 10) / 10);
    const maxLevelVal = Math.ceil((data.maxLevel + 0.15) * 10) / 10;
    const levelRange = maxLevelVal - minLevelVal || 1;

    const getX = (hour: number) => PADDING.left + (hour / 24) * CHART_WIDTH;
    const getY = (level: number) =>
      PADDING.top + (1 - (level - minLevelVal) / levelRange) * CHART_HEIGHT;

    const coords = data.curvePoints.map((pt) => ({
      x: getX(pt.hour),
      y: getY(pt.level),
      hour: pt.hour,
      level: pt.level,
    }));

    // Build SVG path
    let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
    for (let i = 1; i < coords.length; i++) {
      d += ` L ${coords[i].x.toFixed(1)} ${coords[i].y.toFixed(1)}`;
    }

    // Area path (closed down to baseline)
    const baselineY = PADDING.top + CHART_HEIGHT;
    const aD = `${d} L ${coords[coords.length - 1].x.toFixed(1)} ${baselineY} L ${coords[0].x.toFixed(1)} ${baselineY} Z`;

    const getCoordsFn = (hour: number, level: number) => ({
      x: getX(hour),
      y: getY(level),
    });

    return {
      minL: minLevelVal,
      maxL: maxLevelVal,
      pathD: d,
      areaD: aD,
      getCoords: getCoordsFn,
    };
  }, [data, CHART_WIDTH, CHART_HEIGHT, PADDING.left, PADDING.top]);

  // Current Time / AGORA line coordinates
  const nowCoords = useMemo(() => {
    if (!data) return null;
    const h = data.currentHourFraction;
    const x = PADDING.left + (h / 24) * CHART_WIDTH;
    const y = getCoords(h, data.currentLevel).y;
    return { x, y, hourFraction: h };
  }, [data, CHART_WIDTH, PADDING.left, getCoords]);

  // Interactive mouse / touch move scrubber
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || !data) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * SVG_WIDTH;

    if (svgX < PADDING.left || svgX > SVG_WIDTH - PADDING.right) {
      setHoveredPoint(null);
      return;
    }

    const hour = ((svgX - PADDING.left) / CHART_WIDTH) * 24;
    // Find closest curve point
    let closest = data.curvePoints[0];
    let minDiff = 999;
    for (const pt of data.curvePoints) {
      const diff = Math.abs(pt.hour - hour);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }

    const hh = Math.floor(closest.hour);
    const mm = Math.round((closest.hour - hh) * 60);
    const timeFormatted = `${String(hh).padStart(2, '0')}h${String(mm).padStart(2, '0')}`;
    const { x, y } = getCoords(closest.hour, closest.level);

    setHoveredPoint({
      hour: closest.hour,
      level: closest.level,
      x,
      y,
      timeFormatted,
    });
  };

  const handlePointerLeave = () => {
    setHoveredPoint(null);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/mare` : '';
    const shareTitle = `Tábua de Marés de Ilhéus — Ocean Club (${data?.formattedDate || 'Hoje'})`;
    const shareText = `Confira a tábua de marés de hoje para o Porto de Ilhéus: ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading && !data) {
    return (
      <div className={cn('w-full max-w-4xl mx-auto p-8 rounded-2xl bg-[#03182D]/80 border border-white/10 animate-pulse text-center', className)}>
        <Waves className="w-8 h-8 text-[#16C4E8] animate-bounce mx-auto mb-3" />
        <p className="text-white/60 font-mono text-sm tracking-wider uppercase">Carregando Tábua de Marés de Ilhéus…</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className={cn(
        'w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#041c35] to-[#02101e] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md',
        className
      )}
    >
      {/* Editorial Header */}
      <div className="px-6 pt-6 sm:px-8 sm:pt-8 pb-4 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16C4E8] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#16C4E8] font-semibold">
              Porto de Ilhéus Malhado · Bahia
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase">
            Tábua de Marés
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-sans mt-0.5 capitalize">
            {data.weekday} · {data.formattedDate}
          </p>
        </div>

        {/* Live Water Level Pill & Share */}
        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2.5">
            <span className="text-xs text-white/60 uppercase font-mono tracking-wider">Agora:</span>
            <span className="text-base font-bold font-mono text-white">{data.currentLevel.toFixed(2)}m</span>
            <span
              className={cn(
                'text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold',
                data.trend === 'rising'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              )}
            >
              {data.trend === 'rising' ? '▲ Enchendo' : '▼ Vazante'}
            </span>
          </div>

          {showShare && (
            <button
              onClick={handleShare}
              className="h-10 px-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all duration-200 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
              title="Compartilhar Tábua de Marés"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Chart Wave Area */}
      <div className="relative px-2 sm:px-6 pt-4 pb-2 select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            {/* Wave gradient fill */}
            <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16C4E8" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#16C4E8" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#03182D" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing line filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Level Guides */}
          <line
            x1={PADDING.left}
            y1={PADDING.top}
            x2={SVG_WIDTH - PADDING.right}
            y2={PADDING.top}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />
          <line
            x1={PADDING.left}
            y1={PADDING.top + CHART_HEIGHT / 2}
            x2={SVG_WIDTH - PADDING.right}
            y2={PADDING.top + CHART_HEIGHT / 2}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />

          {/* Area under the curve */}
          {areaD && <path d={areaD} fill="url(#tideGradient)" />}

          {/* Wave line stroke with glow */}
          {pathD && (
            <>
              <path
                d={pathD}
                fill="none"
                stroke="#16C4E8"
                strokeWidth="5"
                opacity="0.25"
                filter="url(#glow)"
              />
              <path
                d={pathD}
                fill="none"
                stroke="#16C4E8"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Baseline axis */}
          <line
            x1={PADDING.left}
            y1={PADDING.top + CHART_HEIGHT}
            x2={SVG_WIDTH - PADDING.right}
            y2={PADDING.top + CHART_HEIGHT}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />

          {/* Timeline markers: 00h, 06h, 12h, 18h, 24h */}
          {[0, 6, 12, 18, 24].map((h) => {
            const x = PADDING.left + (h / 24) * CHART_WIDTH;
            const baseY = PADDING.top + CHART_HEIGHT;
            return (
              <g key={h}>
                <line
                  x1={x}
                  y1={baseY}
                  x2={x}
                  y2={baseY + 6}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={baseY + 22}
                  fill="rgba(255,255,255,0.5)"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {String(h).padStart(2, '0')}h
                </text>
              </g>
            );
          })}

          {/* Real-time Indicator: "AGORA" */}
          {nowCoords && (
            <g>
              {/* Vertical red indicator line */}
              <line
                x1={nowCoords.x}
                y1={PADDING.top - 12}
                x2={nowCoords.x}
                y2={PADDING.top + CHART_HEIGHT}
                stroke="#F23343"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />

              {/* Top Label AGORA */}
              <text
                x={nowCoords.x}
                y={PADDING.top - 20}
                fill="#F23343"
                fontSize="11"
                fontWeight="700"
                fontFamily="monospace"
                letterSpacing="0.1em"
                textAnchor="middle"
              >
                AGORA
              </text>

              {/* Pulsing indicator on the curve */}
              <circle
                cx={nowCoords.x}
                cy={nowCoords.y}
                r="8"
                fill="#F23343"
                opacity="0.35"
                className="animate-ping"
              />
              <circle
                cx={nowCoords.x}
                cy={nowCoords.y}
                r="4.5"
                fill="#F23343"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Interactive Hover Point & Tooltip */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={PADDING.top}
                x2={hoveredPoint.x}
                y2={PADDING.top + CHART_HEIGHT}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="5"
                fill="#16C4E8"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Floating Tooltip Pill */}
              <g
                transform={`translate(${Math.max(
                  PADDING.left + 50,
                  Math.min(SVG_WIDTH - PADDING.right - 50, hoveredPoint.x)
                )}, ${Math.max(PADDING.top + 20, hoveredPoint.y - 25)})`}
              >
                <rect
                  x="-48"
                  y="-18"
                  width="96"
                  height="26"
                  rx="6"
                  fill="#03182D"
                  stroke="#16C4E8"
                  strokeWidth="1.2"
                />
                <text
                  x="0"
                  y="-1"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {hoveredPoint.timeFormatted} · {hoveredPoint.level.toFixed(2)}m
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* 4 Tide Events Grid */}
      <div className="p-4 sm:p-6 bg-black/20 border-t border-white/5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {data.events.map((ev, idx) => (
            <div
              key={`${ev.time}-${idx}`}
              className={cn(
                'rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 relative border',
                ev.isNext
                  ? 'bg-[#062444]/90 border-[#16C4E8]/60 shadow-lg shadow-[#16C4E8]/10 ring-1 ring-[#16C4E8]/30 scale-[1.02]'
                  : 'bg-[#03182D]/70 border-white/10 hover:border-white/20',
                ev.isPast && !ev.isNext && 'opacity-65'
              )}
            >
              {/* "Próxima" Tag */}
              {ev.isNext && (
                <span className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-[#16C4E8] text-[#03182D] text-[9px] font-mono font-extrabold uppercase tracking-widest">
                  Próxima
                </span>
              )}

              {/* Icon & Eyebrow */}
              <div className="flex items-center gap-1.5 mb-2">
                {ev.type === 'high' ? (
                  <ArrowUp className="w-3.5 h-3.5 text-[#16C4E8]" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-[#16C4E8]" />
                )}
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] font-semibold text-white/70">
                  {ev.name}
                </span>
              </div>

              {/* Time display: 05h36 */}
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-none mb-1.5">
                {ev.time.replace(':', 'h')}
              </div>

              {/* Tide Height in Meters: 1,94m */}
              <div className="text-sm sm:text-base font-mono font-medium text-[#16C4E8]">
                {ev.level.toFixed(2).replace('.', ',')}m
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info: Moon Phase & Sun Times */}
      <div className="px-4 sm:px-6 py-4 bg-[#020b14]/60 border-t border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center sm:text-left">
          {/* Moon Phase Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3.5 flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-white/80">
              <Moon className="w-4 h-4 text-[#16C4E8]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">Fase da Lua</div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>{data.moon.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-xs font-mono text-[#16C4E8]">{data.moon.illumination}% iluminada</span>
              </div>
            </div>
          </div>

          {/* Sun Times Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3.5 flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-amber-400">
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">Horário Solar · Ilhéus</div>
              <div className="text-sm font-semibold text-white flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-xs">
                  <ArrowUp className="w-3 h-3 text-amber-400" /> {data.sun.sunrise}
                </span>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1 font-mono text-xs">
                  <ArrowDown className="w-3 h-3 text-amber-400" /> {data.sun.sunset}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Source Footnote */}
        <div className="mt-4 pt-3 border-t border-white/5 text-center text-[10px] sm:text-[11px] font-mono text-white/40 tracking-wider">
          {data.source} · Horário de Brasília (UTC-3)
        </div>
      </div>
    </div>
  );
}
