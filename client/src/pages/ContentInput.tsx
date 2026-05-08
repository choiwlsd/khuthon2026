/**
 * Content Input Page
 * 
 * 사용자가 콘텐츠 제목과 카테고리를 입력하여 알고리즘 분석을 시작하는 페이지입니다.
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Layout, Header, Nav, Main, Section, Footer } from '@/components/common/Layout';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { dummySpectrumCategories } from '@/data/dummy';
import HeaderLayout from '@/components/HeaderLayout';

interface ContentItem {
  id: string;
  title: string;
  category: string;
}

/**
 * ContentInput: 콘텐츠 입력 페이지 컴포넌트
 * 
 * 사용자가 콘텐츠를 입력하고 알고리즘 분석을 시작합니다.
 */
export default function ContentInput() {
  const [, setLocation] = useLocation();
  const { logPageView, logMissionStart } = useDiagnostics('user-1');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    logPageView('ContentInput', window.location.pathname);
  }, [logPageView]);

  const handleAddContent = () => {
    if (!title.trim() || !category) {
      alert('제목과 카테고리를 모두 입력해주세요.');
      return;
    }

    const newContent: ContentItem = {
      id: `content-${Date.now()}`,
      title: title.trim(),
      category,
    };

    setContents([...contents, newContent]);
    setTitle('');
    setCategory('');
  };

  const handleRemoveContent = (id: string) => {
    setContents(contents.filter((item) => item.id !== id));
  };

  const handleStartAnalysis = () => {
    if (contents.length === 0) {
      alert('최소 1개 이상의 콘텐츠를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    logMissionStart('mission-1', 'audit');

    // 시뮬레이션: 2초 후 분석 페이지로 이동
    setTimeout(() => {
      setIsSubmitting(false);
      setLocation('/audit');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddContent();
    }
  };

  return (
    <Layout>
      {/* Header */}
      <HeaderLayout />

      {/* Main Content */}
      <Main>
        <Section title="내 피드 분석하기" description="당신이 최근에 본 콘텐츠를 입력하고 알고리즘을 분석해보세요">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>콘텐츠 추가</CardTitle>
                <CardDescription>제목과 카테고리를 입력하고 추가 버튼을 클릭하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    콘텐츠 제목 *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="예: 오징어 게임, 뉴진스 - Super Shy, 해리 포터..."
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    카테고리 *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">카테고리를 선택하세요</option>
                    {dummySpectrumCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add Button */}
                <Button
                  fullWidth
                  onClick={handleAddContent}
                  className="mt-4"
                >
                  콘텐츠 추가
                </Button>
              </CardContent>
            </Card>

            {/* Added Contents List */}
            {contents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>추가된 콘텐츠</CardTitle>
                  <CardDescription>{contents.length}개의 콘텐츠가 추가되었습니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {contents.map((content, idx) => {
                      const categoryInfo = dummySpectrumCategories.find(
                        (cat) => cat.name === content.category
                      );
                      return (
                        <div
                          key={content.id}
                          className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{categoryInfo?.icon}</span>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{content.title}</p>
                              <p className="text-sm text-muted-foreground">{categoryInfo?.label}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveContent(content.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors text-xl"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Box */}
            <Card className="bg-secondary/30 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">💡</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">팁</p>
                    <p className="text-sm text-muted-foreground">
                      최소 5개 이상의 콘텐츠를 추가하면 더 정확한 알고리즘 분석 결과를 얻을 수 있습니다.
                      당신이 최근 한 달간 본 다양한 콘텐츠를 추가해보세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={handleStartAnalysis}
                disabled={contents.length === 0 || isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? '분석 중...' : `분석 시작 (${contents.length}개)`}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation('/')}
              >
                취소
              </Button>
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
