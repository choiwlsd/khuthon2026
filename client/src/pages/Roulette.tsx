/**
 * Anti-Recommendation Roulette Page
 *
 * 원형 룰렛 휠 스타일로 알고리즘이 숨긴 콘텐츠를 발견하는 페이지입니다.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Layout, Main, Section, Footer } from '@/components/common/Layout';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { dummyAntiRecommendations } from '@/data/dummy';
import HeaderLayout from '@/components/HeaderLayout';

const SEGMENT_COLORS: [string, string][] = [
  ['#f8d5dc', '#f2b6c4'],
  ['#ddd2f8', '#c5b4f2'],
  ['#d7f0dd', '#b8e3c1'],
  ['#ffe7cb', '#ffd1a6'],
  ['#d5f0f0', '#aee3dd'],
  ['#f6d7ec', '#edbde0'],
  ['#f8efc9', '#f3e09d'],
  ['#dbe5ff', '#bccdff'],
];

const CATEGORY_EMOJI: Record<string, string> = {
  드라마: '🎬',
  음악: '🎵',
  영화: '🎬',
  게임: '🎮',
  미술: '🖼️',
  책: '📚',
};

const FULL_ROTATION = Math.PI * 2;
const POINTER_ANGLE = 0;
const WHEEL_SIZE = 360;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = 172;

function getEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🔮';
}

function getWheelAngleForIndex(index: number, total: number): number {
  const arc = FULL_ROTATION / total;
  return POINTER_ANGLE + Math.PI / 2 - (index + 0.5) * arc;
}

function normalizeAngle(angle: number): number {
  return ((angle % FULL_ROTATION) + FULL_ROTATION) % FULL_ROTATION;
}

function drawWheel(
  ctx: CanvasRenderingContext2D,
  items: typeof dummyAntiRecommendations,
  angle: number
) {
  const segmentCount = items.length;
  const arc = FULL_ROTATION / segmentCount;

  ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);

  const outerGlow = ctx.createRadialGradient(CENTER, CENTER, 30, CENTER, CENTER, RADIUS + 34);
  outerGlow.addColorStop(0, 'rgba(148,163,184,0.18)');
  outerGlow.addColorStop(0.7, 'rgba(15,23,42,0.06)');
  outerGlow.addColorStop(1, 'rgba(15,23,42,0)');
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS + 30, 0, FULL_ROTATION);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS + 14, 0, FULL_ROTATION);
  ctx.fillStyle = '#dbe4f0';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS + 8, 0, FULL_ROTATION);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 6;
  ctx.stroke();

  for (let i = 0; i < segmentCount; i++) {
    const [bg, accent] = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    const start = angle + i * arc - Math.PI / 2;
    const end = start + arc;

    const fill = ctx.createLinearGradient(
      CENTER + Math.cos(start) * RADIUS,
      CENTER + Math.sin(start) * RADIUS,
      CENTER + Math.cos(end) * RADIUS,
      CENTER + Math.sin(end) * RADIUS
    );
    fill.addColorStop(0, bg);
    fill.addColorStop(1, accent);

    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.arc(CENTER, CENTER, RADIUS, start, end);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.arc(CENTER, CENTER, RADIUS, start, end);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148,163,184,0.28)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const mid = start + arc / 2;
    const textRadius = RADIUS * 0.66;
    const tx = CENTER + Math.cos(mid) * textRadius;
    const ty = CENTER + Math.sin(mid) * textRadius;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(mid + Math.PI / 2);

    ctx.font = '700 22px Pretendard, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getEmoji(items[i].category), 0, -15);

    ctx.font = '600 11px Pretendard, sans-serif';
    ctx.fillStyle = '#475569';
    const label =
      items[i].title.length > 8 ? `${items[i].title.slice(0, 8)}…` : items[i].title;
    ctx.fillText(label, 0, 9);
    ctx.restore();
  }

  for (let i = 0; i < segmentCount; i++) {
    const tickAngle = angle + i * arc - Math.PI / 2;
    const inner = RADIUS - 15;
    const outer = RADIUS + 4;

    ctx.beginPath();
    ctx.moveTo(CENTER + Math.cos(tickAngle) * inner, CENTER + Math.sin(tickAngle) * inner);
    ctx.lineTo(CENTER + Math.cos(tickAngle) * outer, CENTER + Math.sin(tickAngle) * outer);
    ctx.strokeStyle = 'rgba(100,116,139,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const hub = ctx.createRadialGradient(CENTER - 12, CENTER - 12, 8, CENTER, CENTER, 58);
  hub.addColorStop(0, '#fff7fb');
  hub.addColorStop(1, '#d8dee9');
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, 54, 0, FULL_ROTATION);
  ctx.fillStyle = hub;
  ctx.fill();
  ctx.strokeStyle = 'rgba(148,163,184,0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, 36, 0, FULL_ROTATION);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fill();
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Roulette() {
  const { logPageView, logItemDiscovery } = useDiagnostics('user-1');
  const totalItems = dummyAntiRecommendations.length;
  const initialAngle = getWheelAngleForIndex(0, totalItems);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(initialAngle);
  const spinningRef = useRef(false);
  const rafRef = useRef<number>(0);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const currentItem = dummyAntiRecommendations[currentIdx];
  const [bg, accent] = SEGMENT_COLORS[currentIdx % SEGMENT_COLORS.length];

  useEffect(() => {
    logPageView('Roulette', window.location.pathname);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWheel(ctx, dummyAntiRecommendations, angleRef.current);

    return () => cancelAnimationFrame(rafRef.current);
  }, [logPageView]);

  const handleSpin = useCallback(() => {
    if (spinningRef.current) return;
    spinningRef.current = true;
    setIsSpinning(true);

    let target: number;
    do {
      target = Math.floor(Math.random() * totalItems);
    } while (target === currentIdx);

    const targetAngle = getWheelAngleForIndex(target, totalItems);
    const extraSpins = (4 + Math.floor(Math.random() * 3)) * FULL_ROTATION;
    const startAngle = angleRef.current;
    const endAngle =
      startAngle +
      extraSpins +
      ((targetAngle - normalizeAngle(startAngle) + FULL_ROTATION) % FULL_ROTATION);
    const duration = 2400;
    const startTime = performance.now();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const currentAngle = startAngle + (endAngle - startAngle) * easeOut(t);
      angleRef.current = currentAngle;

      if (ctx) drawWheel(ctx, dummyAntiRecommendations, currentAngle);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        angleRef.current = endAngle;
        spinningRef.current = false;
        setIsSpinning(false);
        setCurrentIdx(target);
        setUserRating(0);

        const item = dummyAntiRecommendations[target];
        logItemDiscovery(item.id, 'anti-recommendation', item.category);
        setDiscovered((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  }, [currentIdx, logItemDiscovery, totalItems]);

  const handleSave = () => {
    alert(`"${currentItem.title}" 저장 완료!\n⭐ ${userRating > 0 ? `${userRating}점` : '미평가'}`);
  };

  return (
    <Layout>
      <HeaderLayout />

      <Main>
        <Section
          title="Anti-Recommendation Roulette"
          description="알고리즘이 숨긴 문화를 발견해보세요"
        >
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-5">
              <div className="relative flex items-center justify-center" style={{ width: WHEEL_SIZE + 44 }}>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(148,163,184,0.18) 0%, rgba(255,255,255,0) 68%)',
                    filter: 'blur(10px)',
                  }}
                />

                <div
                  className="relative rounded-full p-[14px]"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(203,213,225,0.9))',
                    boxShadow:
                      '0 22px 42px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
                  }}
                >
                  <div
                    className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-lg"
                    style={{
                      right: -20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: bg,
                    }}
                  >
                    ◀
                  </div>

                  <canvas
                    ref={canvasRef}
                    width={WHEEL_SIZE}
                    height={WHEEL_SIZE}
                    style={{
                      borderRadius: '50%',
                      display: 'block',
                      boxShadow: '0 14px 30px rgba(15,23,42,0.18)',
                    }}
                  />

                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="absolute z-20 font-bold text-sm tracking-[0.22em] text-slate-900 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 92,
                      height: 92,
                      borderRadius: '50%',
                      background: 'linear-gradient(180deg, #f8fafc 0%, #cbd5e1 100%)',
                      border: '3px solid rgba(255,255,255,0.8)',
                      boxShadow:
                        '0 16px 30px rgba(15,23,42,0.24), inset 0 -8px 14px rgba(148,163,184,0.35)',
                    }}
                  >
                    {isSpinning ? 'SPIN...' : 'SPIN'}
                  </button>
                </div>
              </div>

              {discovered.length > 0 && (
                <p className="text-sm text-muted-foreground">{discovered.length}개 발견</p>
              )}

              {discovered.length > 0 && (
                <Card className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">발견한 콘텐츠</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {discovered.map((id) => {
                        const item = dummyAntiRecommendations.find((entry) => entry.id === id);
                        return item ? (
                          <span
                            key={id}
                            className="rounded-full border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground"
                          >
                            {item.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div
                  className="relative flex items-end justify-start"
                  style={{
                    aspectRatio: '16/9',
                    background: currentItem.image
                      ? `linear-gradient(to top, rgba(0,0,0,0.68), rgba(0,0,0,0.14)), url(${currentItem.image}) center/cover`
                      : `linear-gradient(135deg, ${bg} 0%, ${accent}44 100%)`,
                  }}
                >
                  <span
                    className="pointer-events-none absolute right-6 top-4 select-none"
                    style={{ fontSize: 82, opacity: 0.22 }}
                    aria-hidden
                  >
                    {getEmoji(currentItem.category)}
                  </span>

                  <div className="relative z-10 p-4">
                    <h3 className="text-xl font-bold leading-snug text-white">
                      {currentItem.title}
                    </h3>
                    <span
                      className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: `${accent}33`, color: '#fff' }}
                    >
                      {currentItem.category}
                    </span>
                  </div>
                </div>

                <CardContent className="space-y-3 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {currentItem.description}
                  </p>

                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">발견 가치</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-primary">
                          {currentItem.discoveryScore}
                        </span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${currentItem.discoveryScore}%`,
                          background: `linear-gradient(90deg, ${bg}, ${accent})`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-border/50 bg-secondary/40 p-3">
                <p className="mb-1 text-xs font-semibold text-muted-foreground">왜 숨겨졌나요?</p>
                <p className="text-sm text-muted-foreground">{currentItem.reason}</p>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">평가하기</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="text-3xl transition-transform hover:scale-125"
                        style={{ color: star <= userRating ? '#e9a825' : 'var(--muted-foreground)' }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <Button fullWidth onClick={handleSave} variant="outline" size="sm">
                    💾 저장하기
                  </Button>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button size="sm" onClick={handleSpin} disabled={isSpinning} className="flex-1">
                  더 발견하기
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`${discovered.length}개의 콘텐츠 발견 결과가 저장되었습니다!`)}
                  className="flex-1"
                >
                  결과 저장
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </Main>

      <Footer>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2026 Digi-Kaleidos. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔮</span>
            <span className="font-bold">Digi-Kaleidos</span>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
