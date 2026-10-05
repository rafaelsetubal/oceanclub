'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUp, ArrowDown, Sun, Moon, Waves, Clock, Share2, Check, Anchor, Sparkles } from 'lucide-react';
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
  const SVG_HEIGHT = 320;
  const PADDING = { top: 48, bottom: 52, left: 48, right: 54 };
  const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;

  // Scale calculations & SVG path generation
  const { minL, maxL, pathD, areaD, getCoords, depthLevels } = useMemo(() => {
    if (!data || !data.curvePoints || data.curvePoints.length === 0) {
      return {
        minL: 0,
        maxL: 2.2,
        pathD: '',
        areaD: '',
        getCoords: () => ({ x: 0, y: 0 }),
        depthLevels: [],
      };
    }

    const minLevelVal = 0.0;
    const maxLevelVal = 2.4;
    const levelRange = maxLevelVal - minLevelVal;

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

    // Reference depth lines: 0.5m, 1.0m, 1.5m, 2.0m
    const depths = [0.5, 1.0, 1.5, 2.0].map((val) => ({
      val,
      y: getY(val),
    }));

    return {
      minL: minLevelVal,
      maxL: maxLevelVal,
      pathD: d,
      areaD: aD,
      getCoords: getCoordsFn,
      depthLevels: depths,
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
      <div className={cn('w-full max-w-4xl mx-auto p-12 rounded-3xl bg-[#031424]/90 border border-white/10 shadow-2xl animate-pulse text-center', className)}>
        <Waves className="w-10 h-10 text-[#16C4E8] animate-bounce mx-auto mb-4" />
        <p className="text-white/70 font-mono text-sm tracking-widest uppercase">Consultando Marinha do Brasil (DHN)…</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className={cn(
        'w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#061e35] via-[#031322] to-[#010912] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl relative',
        className
      )}
    >
      {/* Decorative luxury gradient highlights */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#16C4E8]/40 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#16C4E8]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Editorial Header */}
      <div className="px-6 pt-7 sm:px-10 sm:pt-9 pb-5 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16C4E8]/10 border border-[#16C4E8]/20 text-[#16C4E8] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16C4E8] animate-pulse" />
              Oficial DHN · Marinha do Brasil
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase leading-none">
            Tábua de Marés
          </h2>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-white/60 font-sans">
            <span className="text-[#16C4E8] font-medium font-mono uppercase tracking-wider">Ilhéus · Bahia</span>
            <span>·</span>
            <span className="capitalize">{data.weekday}, {data.formattedDate}</span>
          </div>
        </div>

        {/* Live Water Level Pill & Share Button */}
        <div className="flex items-center gap-3">
          <div className="bg-[#02101e]/80 border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-inner">
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/50 uppercase font-mono tracking-widest leading-none">
                Nível Agora
              </span>
              <span className="text-lg font-bold font-mono text-white leading-tight mt-0.5">
                {data.currentLevel.toFixed(2).replace('.', ',')}m
              </span>
            </div>

            <div
              className={cn(
                'text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold flex items-center gap-1',
                data.trend === 'rising'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              )}
            >
              {data.trend === 'rising' ? (
                <>
                  <ArrowUp className="w-3 h-3" /> Enchendo
                </>
              ) : (
                <>
                  <ArrowDown className="w-3 h-3" /> Vazante
                </>
              )}
            </div>
          </div>

          {showShare && (
            <button
              onClick={handleShare}
              className="h-11 px-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-white/80 hover:text-white transition-all duration-200 flex items-center gap-2 text-xs font-mono uppercase tracking-wider cursor-pointer"
              title="Compartilhar Tábua de Marés"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#16C4E8]" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Visual Chart Wave Area */}
      <div className="relative px-3 sm:px-8 pt-6 pb-2 select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            {/* Wave gradient fill */}
            <linearGradient id="tideAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16C4E8" stopOpacity="0.32" />
              <stop offset="45%" stopColor="#16C4E8" stopOpacity="0.12" />
              <stop offset="90%" stopColor="#03182D" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#010912" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Depth reference guide lines with labels on right */}
          {depthLevels.map(({ val, y }) => (
            <g key={val}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={SVG_WIDTH - PADDING.right}
                y2={y}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="4 6"
                strokeWidth="1"
              />
              <text
                x={SVG_WIDTH - PADDING.right + 8}
                y={y + 3.5}
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="600"
              >
                {val.toFixed(1)}m
              </text>
            </g>
          ))}

          {/* Area under the curve */}
          {areaD && <path d={areaD} fill="url(#tideAreaGradient)" />}

          {/* High-tech Wave stroke */}
          {pathD && (
            <>
              {/* Soft bloom glow behind */}
              <path
                d={pathD}
                fill="none"
                stroke="#16C4E8"
                strokeWidth="7"
                opacity="0.28"
                filter="url(#waveGlow)"
              />
              {/* Crisp main line */}
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
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
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
                  y2={baseY + 7}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={baseY + 24}
                  fill="rgba(255,255,255,0.85)"
                  fontSize="13"
                  fontWeight="700"
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
                y1={PADDING.top - 18}
                x2={nowCoords.x}
                y2={PADDING.top + CHART_HEIGHT}
                stroke="#F23343"
                strokeWidth="2.2"
                strokeDasharray="5 3"
              />

              {/* Top Red Badge "AGORA" */}
              <g transform={`translate(${nowCoords.x}, ${PADDING.top - 24})`}>
                <rect
                  x="-28"
                  y="-15"
                  width="56"
                  height="20"
                  rx="5"
                  fill="#F23343"
                  className="shadow-lg shadow-red-500/50"
                />
                <text
                  x="0"
                  y="-1"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="900"
                  fontFamily="monospace"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  AGORA
                </text>
              </g>

              {/* Pulsing radar point on the curve */}
              <circle
                cx={nowCoords.x}
                cy={nowCoords.y}
                r="12"
                fill="#F23343"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={nowCoords.x}
                cy={nowCoords.y}
                r="6"
                fill="#F23343"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* Interactive Hover Scrubber & Tooltip */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={PADDING.top}
                x2={hoveredPoint.x}
                y2={PADDING.top + CHART_HEIGHT}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="7"
                fill="#16C4E8"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              {/* Tooltip Pill */}
              <g
                transform={`translate(${Math.max(
                  PADDING.left + 55,
                  Math.min(SVG_WIDTH - PADDING.right - 55, hoveredPoint.x)
                )}, ${Math.max(PADDING.top + 20, hoveredPoint.y - 30)})`}
              >
                <rect
                  x="-58"
                  y="-22"
                  width="116"
                  height="30"
                  rx="8"
                  fill="#03182D"
                  stroke="#16C4E8"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="-1"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="800"
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
      <div className="p-5 sm:p-8 bg-black/30 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
          {data.events.map((ev, idx) => (
            <div
              key={`${ev.time}-${idx}`}
              className={cn(
                'rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 relative border group',
                ev.isNext
                  ? 'bg-gradient-to-b from-[#083058] to-[#041a31] border-[#16C4E8] shadow-[0_10px_30px_-5px_rgba(22,196,232,0.3)] ring-1 ring-[#16C4E8]/50 scale-[1.03]'
                  : 'bg-[#031526]/80 border-white/15 hover:border-white/30 hover:bg-[#051c33]',
                ev.isPast && !ev.isNext && 'opacity-70'
              )}
            >
              {/* "Próxima" Tag */}
              {ev.isNext && (
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#16C4E8] text-[#03182D] text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1 shadow-md shadow-[#16C4E8]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#03182D] animate-ping" />
                  Próxima Maré
                </div>
              )}

              {/* Icon & Eyebrow */}
              <div className="flex items-center gap-1.5 mb-2">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center',
                    ev.type === 'high' ? 'bg-[#16C4E8]/20 text-[#16C4E8]' : 'bg-sky-500/20 text-sky-300'
                  )}
                >
                  {ev.type === 'high' ? (
                    <ArrowUp className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] font-bold text-white">
                  {ev.name}
                </span>
              </div>

              {/* Time display: 05h36 */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-none mb-1.5">
                {ev.time.replace(':', 'h')}
              </div>

              {/* Tide Height in Meters: 1,94m */}
              <div className="text-base sm:text-lg font-mono font-bold text-[#16C4E8] tracking-tight">
                {ev.level.toFixed(2).replace('.', ',')}m
              </div>

              {/* Sub-label */}
              <span className="text-xs font-sans text-white/80 mt-1 uppercase tracking-wider font-medium">
                {ev.type === 'high' ? 'Maré Cheia' : 'Maré Seca'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info: Moon Phase & Sun Times */}
      <div className="px-5 sm:px-8 py-5 bg-[#010811]/90 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Moon Phase Card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#16C4E8]/15 border border-[#16C4E8]/30 flex items-center justify-center flex-shrink-0 text-[#16C4E8]">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/70 font-semibold">Fase Lunar</div>
              <div className="text-base sm:text-lg font-semibold text-white flex items-center gap-2 mt-0.5">
                <span>{data.moon.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-sm font-mono font-bold text-[#16C4E8]">{data.moon.illumination}% iluminada</span>
              </div>
            </div>
          </div>

          {/* Sun Times Card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/70 font-semibold">Sol em Ilhéus</div>
              <div className="text-base sm:text-lg font-semibold text-white flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1.5 font-mono text-sm text-white">
                  <ArrowUp className="w-3.5 h-3.5 text-amber-400" /> {data.sun.sunrise}
                </span>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1.5 font-mono text-sm text-white">
                  <ArrowDown className="w-3.5 h-3.5 text-amber-400" /> {data.sun.sunset}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Source Footnote */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-mono text-white/70 tracking-wider font-medium">
          <span>{data.source}</span>
          <span>Porto de Ilhéus Malhado · Horário de Brasília (UTC-3)</span>
        </div>
      </div>
    </div>
  );
}
