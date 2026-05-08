/**
 * Home Page
 * 
 * Digi-Kaleidos 서비스의 홈 페이지입니다.
 * 히어로 섹션, 주요 기능, 사용자 리뷰를 포함합니다.
 */

import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Layout, Header, Nav, Main, Section, Footer, Grid, Flex, Container } from '@/components/common/Layout';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { dummyFeatures } from '@/data/dummy';
import MainHomeImage from '@/assets/main-home-image.png';
import HeaderLayout from '@/components/HeaderLayout';

/**
 * Home: 홈 페이지 컴포넌트
 * 
 * 서비스의 전체 개요와 주요 기능을 소개합니다.
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const { logPageView, logMissionStart } = useDiagnostics('user-1');

  useEffect(() => {
    logPageView('Home', window.location.pathname);
  }, [logPageView]);

  const handleMissionClick = (missionId: string, missionType: string) => {
    logMissionStart(missionId, missionType);
    setLocation('/input');
  };

  return (
    <Layout>
      {/* Header */}
      <HeaderLayout />

      {/* Main Content */}
      <Main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-secondary rounded-full text-sm font-medium text-primary">
                ✨ 당신의 문화 스펙트럼 발견
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                알고리즘이 숨긴 <span className="text-gradient">문화를</span> <br />
                <span className="text-gradient">다시 보이게 하다</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                당신의 피드는 당신을 얼마나 좁게 보고 있을까? <br />
                Bubble-Out은 당신의 문화 스펙트럼을 진단하고, 보지 못했던 새로운 세계로 안내합니다.
              </p>
              <Flex gap="md" className="pt-4">
                <Button size="lg" onClick={() => handleMissionClick('mission-1', 'audit')}>
                  내 피드 분석하기 →
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  더 알아보기
                </Button>
              </Flex>
            </div>

            {/* Right: Visual Element */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-98 h-98 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl ">
                  <img src={MainHomeImage} alt="Main Home Image" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section id="features" title="당신의 문화 스펙트럼을 넓혀주는 3가지 방법">
          <Grid columns={3} gap="lg">
            {dummyFeatures.map((feature) => (
              <Card key={feature.number} hoverable className="group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl font-bold text-primary/30 group-hover:text-primary/50 transition-all duration-300 ease-out">
                      {feature.number}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl py-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">이제 당신의 문화 사각지대를 발견해보세요</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              내 피드 분석부터 시작해서, 당신의 문화 스펙트럼을 완성해보세요.
            </p>
            <Button size="lg" onClick={() => handleMissionClick('mission-1', 'audit')}>
              지금 시작하기 →
            </Button>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq" title="자주 묻는 질문">
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: '내 데이터는 안전한가요?',
                a: '네, 모든 데이터는 암호화되어 저장되며, 개인정보보호법을 준수합니다.',
              },
              {
                q: '분석에 얼마나 걸리나요?',
                a: '일반적으로 3-5분 정도 소요되며, 실시간으로 결과를 확인할 수 있습니다.',
              },
              {
                q: '다른 플랫폼도 분석 가능한가요?',
                a: '현재는 주요 스트리밍 플랫폼을 지원하고 있으며, 계속 확대 중입니다.',
              },
            ].map((faq, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Section>
      </Main>

      {/* Footer */}
      <Footer>
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">Bubble Audit</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">Spectrum Map</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">Roulette</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">회사</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">소개</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">블로그</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">채용</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">법적</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">개인정보</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">이용약관</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">쿠키</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">연락</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@digi-kaleidos.com" className="hover:text-primary transition-all duration-300 ease-out">이메일</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">트위터</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 ease-out">인스타그램</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex items-center justify-between">
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
