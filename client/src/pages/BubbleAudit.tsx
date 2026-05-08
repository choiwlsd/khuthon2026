/**
 * Bubble Audit Page
 * 
 * 사용자의 알고리즘 버블을 분석하는 페이지입니다.
 * 버블 강도, 다양성 점수, 추천 편향을 시각화합니다.
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Layout, Header, Nav, Main, Section, Footer } from '@/components/common/Layout';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { dummyBubbleAuditResult } from '@/data/dummy';
import HeaderLayout from '@/components/HeaderLayout';

/**
 * BubbleAudit: 버블 감사 페이지 컴포넌트
 * 
 * 사용자의 알고리즘 버블을 분석하고 결과를 시각화합니다.
 */
export default function BubbleAudit() {
  const [, setLocation] = useLocation();
  const { logPageView, logMissionComplete } = useDiagnostics('user-1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(dummyBubbleAuditResult);

  useEffect(() => {
    logPageView('BubbleAudit', window.location.pathname);
  }, [logPageView]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // 시뮬레이션: 3초 후 분석 완료
    setTimeout(() => {
      setIsAnalyzing(false);
      logMissionComplete('mission-1', 'audit', 3000, result);
    }, 3000);
  };

  return (
    <Layout>
      {/* Header */}
      <HeaderLayout />

      {/* Main Content */}
      <Main>
        <Section title="Bubble Audit" description="당신의 알고리즘 버블을 분석해보세요">
          {!isAnalyzing && result ? (
            <div className="space-y-8">
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bubble Strength */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">버블 강도</CardTitle>
                    <CardDescription>알고리즘의 강한 정도</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-primary">{result.bubbleStrength}%</div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.bubbleStrength}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        당신의 알고리즘은 {result.bubbleStrength > 70 ? '매우 강한' : '보통 수준의'} 버블을 가지고 있습니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Diversity Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">다양성 점수</CardTitle>
                    <CardDescription>콘텐츠 다양성 정도</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-primary">{result.diversityScore}%</div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.diversityScore}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        더 다양한 콘텐츠를 탐색해보세요.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation Bias */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">추천 편향</CardTitle>
                    <CardDescription>알고리즘의 편향 정도</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-primary">{result.recommendationBias}%</div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.recommendationBias}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        편향이 높을수록 다양한 콘텐츠 탐색이 필요합니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>상위 카테고리</CardTitle>
                    <CardDescription>가장 많이 소비하는 콘텐츠</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.topCategories.map((category, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            {idx + 1}
                          </span>
                          <span className="font-medium">{category}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Hidden Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>숨겨진 카테고리</CardTitle>
                    <CardDescription>알고리즘이 숨기는 콘텐츠</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.hiddenCategories.map((category, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium">{category}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>인사이트</CardTitle>
                  <CardDescription>분석 결과 및 권장사항</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-primary font-bold">💡</span>
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => setLocation('/spectrum')}>스펙트럼 맵 보기 →</Button>
                <Button size="lg" variant="outline" onClick={() => setLocation('/roulette')}>룰렛 시작하기</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold">버블을 분석 중입니다...</h3>
              <p className="text-muted-foreground">이 과정은 약 3-5분이 소요됩니다.</p>
              <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/50 animate-pulse" />
              </div>
            </div>
          )}
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
