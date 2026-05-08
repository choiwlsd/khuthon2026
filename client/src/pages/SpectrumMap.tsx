/**
 * Cultural Spectrum Map Page
 * 
 * 사용자의 문화 스펙트럼을 시각화하는 페이지입니다.
 * 카테고리별 분포와 숨겨진 콘텐츠를 표시합니다.
 */

import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Layout, Header, Nav, Main, Section, Footer, Grid } from '@/components/common/Layout';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { dummyCulturalSpectrum } from '@/data/dummy';
import HeaderLayout from '@/components/HeaderLayout';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

/**
 * SpectrumMap: 문화 스펙트럼 맵 페이지 컴포넌트
 * 
 * 사용자의 문화적 취향을 시각화합니다.
 */
export default function SpectrumMap() {
  const [, setLocation] = useLocation();
  const { logPageView } = useDiagnostics('user-1');

  useEffect(() => {
    logPageView('SpectrumMap', window.location.pathname);
  }, [logPageView]);

  const chartData = [...dummyCulturalSpectrum.categories]
  .sort((a, b) => b.percentage - a.percentage)
  .slice(0, 6)
  .map((c) => ({
    subject: `${c.icon} ${c.label}`,
    value: c.percentage,
    fullMark: 50,
  }));

  console.log(chartData);

  return (
    <Layout>
      {/* Header */}
      <HeaderLayout />

      {/* Main Content */}
      <Main>
        <Section title="Cultural Spectrum Map" description="당신의 문화 스펙트럼을 시각화합니다">
          <div className="space-y-8">
            {/* Spectrum Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>당신의 문화 스펙트럼</CardTitle>
                <CardDescription>
                  총 {dummyCulturalSpectrum.totalAnalyzed.toLocaleString()}개의 콘텐츠 분석
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="w-full h-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData}>
                      
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                      </defs>

                      <PolarGrid stroke="#e5e7eb" />

                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 12 }}
                      />

                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 50]}
                        tick={{ fontSize: 10 }}
                      />

                      <Radar
                        name="현재 피드"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="url(#colorGradient)"
                        fillOpacity={0.6}
                      />

                      <Radar
                        name="균형"
                        dataKey="fullMark"
                        stroke="#8b5cf6"
                        fillOpacity={0}
                        strokeDasharray="4 4"
                      />

                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle>당신의 문화 프로필</CardTitle>
                <CardDescription>분석 기반 인사이트</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {dummyCulturalSpectrum.insights.map((insight, idx) => (
                    <li key={idx} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-primary font-bold">✨</span>
                      <span className="text-muted-foreground">{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4 justify-center pt-8">
              <Button size="lg" onClick={() => setLocation('/roulette')}>반추천 룰렛 시작 →</Button>
              <Button size="lg" variant="outline" onClick={() => alert('결과가 클립보드에 복사되었습니다!')}>결과 공유하기</Button>
            </div>

            {/* Category Details */}
            <div>
              <h3 className="text-2xl font-bold mb-6">카테고리별 상세 분석</h3>
              <Grid columns={2} gap="lg">
                {dummyCulturalSpectrum.categories.map((category) => (
                  <Card key={category.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-3xl">{category.icon}</span>
                            {category.label}
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.percentage}%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">당신의 관심도</span>
                          <span className="font-semibold">{category.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                          이 카테고리에서 새로운 콘텐츠를 발견해보세요.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </div>

          </div>
        </Section>
      </Main>

      {/* Footer */}
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
