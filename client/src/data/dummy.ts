/**
 * Dummy Data for Digi-Kaleidos
 * 
 * 개발 및 테스트용 더미 데이터입니다.
 * 실제 데이터는 백엔드 API에서 제공됩니다.
 */

import type {
  Mission,
  SpectrumCategory,
  CulturalSpectrum,
  BubbleAuditResult,
  AntiRecommendation,
  User,
} from '@/types';

/**
 * 더미 미션 데이터
 */
export const dummyMissions: Mission[] = [
  {
    id: 'mission-1',
    title: 'Bubble Audit',
    description: '당신의 피드는 당신을 정의하지 않습니다. 알고리즘 버블을 감사하고 분석해보세요.',
    type: 'audit',
    icon: '🔍',
    completed: true,
    progress: 100,
    estimatedTime: 5,
    category: 'analysis',
  },
  {
    id: 'mission-2',
    title: 'Cultural Spectrum Map',
    description: '당신의 문화 스펙트럼을 시각화하고 숨겨진 카테고리를 발견하세요.',
    type: 'map',
    icon: '🎨',
    completed: false,
    progress: 45,
    estimatedTime: 10,
    category: 'discovery',
  },
  {
    id: 'mission-3',
    title: 'Anti-Recommendation Roulette',
    description: '알고리즘이 숨긴 문화를 룰렛으로 발견해보세요.',
    type: 'roulette',
    icon: '🎡',
    completed: false,
    progress: 0,
    estimatedTime: 8,
    category: 'discovery',
  },
];

/**
 * 더미 스펙트럼 카테고리 데이터
 */
export const dummySpectrumCategories: SpectrumCategory[] = [
  {
    id: 'cat-1',
    name: 'game',
    label: '게임',
    description: '게임 및 스트리밍 콘텐츠',
    color: '#FF6B6B',
    icon: '🎮',
    percentage: 11,
  },
  {
    id: 'cat-2',
    name: 'mukbang',
    label: '먹방',
    description: '음식 및 먹방 콘텐츠',
    color: '#FFE66D',
    icon: '🍜',
    percentage: 9,
  },
  {
    id: 'cat-3',
    name: 'idol',
    label: '아이돌',
    description: '아이돌 및 팬 문화',
    color: '#FF8B94',
    icon: '🌟',
    percentage: 12,
  },
  {
    id: 'cat-4',
    name: 'vlog',
    label: '브이로그',
    description: '일상 및 라이프 브이로그',
    color: '#E2F0CB',
    icon: '📹',
    percentage: 8,
  },
  {
    id: 'cat-5',
    name: 'documentary',
    label: '다큐멘터리',
    description: '다큐 및 교양 콘텐츠',
    color: '#A0CED9',
    icon: '🎥',
    percentage: 6,
  },
  {
    id: 'cat-6',
    name: 'entertainment',
    label: '예능',
    description: '버라이어티 및 예능 프로그램',
    color: '#FFC75F',
    icon: '😂',
    percentage: 10,
  },
  {
    id: 'cat-7',
    name: 'film',
    label: '영화',
    description: '영화 및 시리즈 콘텐츠',
    color: '#FF9671',
    icon: '🎬',
    percentage: 10,
  },
  {
    id: 'cat-8',
    name: 'fashion',
    label: '패션',
    description: '패션 및 스타일 콘텐츠',
    color: '#00C9A7',
    icon: '👗',
    percentage: 5,
  },
  {
    id: 'cat-9',
    name: 'beauty',
    label: '뷰티',
    description: '메이크업 및 뷰티 콘텐츠',
    color: '#F9F871',
    icon: '💄',
    percentage: 5,
  },
  {
    id: 'cat-10',
    name: 'sports',
    label: '스포츠',
    description: '스포츠 경기 및 분석 콘텐츠',
    color: '#0081CF',
    icon: '⚽',
    percentage: 7,
  },
  {
    id: 'cat-11',
    name: 'travel',
    label: '여행',
    description: '여행 및 관광 콘텐츠',
    color: '#845EC2',
    icon: '✈️',
    percentage: 6,
  },
  {
    id: 'cat-12',
    name: 'music',
    label: '음악',
    description: '음악 및 오디오 콘텐츠',
    color: '#4D8076',
    icon: '🎵',
    percentage: 8,
  },
  {
    id: 'cat-13',
    name: 'webtoon',
    label: '웹툰',
    description: '웹툰 및 디지털 만화',
    color: '#F86624',
    icon: '📚',
    percentage: 2,
  },
  {
    id: 'cat-14',
    name: 'news',
    label: '뉴스',
    description: '시사 및 뉴스 콘텐츠',
    color: '#6C757D',
    icon: '📰',
    percentage: 1,
  },
];

/**
 * 더미 문화 스펙트럼 데이터
 */
export const dummyCulturalSpectrum: CulturalSpectrum = {
  userId: 'user-1',
  categories: dummySpectrumCategories,
  totalAnalyzed: 1250,
  lastUpdated: new Date('2026-05-08'),
  insights: [
    '영화와 음악에 대한 관심이 높습니다.',
    '미술과 디자인 콘텐츠가 숨겨져 있을 가능성이 있습니다.',
    '다양한 장르의 콘텐츠를 소비하고 있습니다.',
  ],
};

/**
 * 더미 버블 감사 결과
 */
export const dummyBubbleAuditResult: BubbleAuditResult = {
  userId: 'user-1',
  bubbleStrength: 78,
  diversityScore: 42,
  recommendationBias: 65,
  topCategories: ['영화', '음악', '책'],
  hiddenCategories: ['미술', '게임', '다큐멘터리'],
  insights: [
    '당신의 알고리즘은 주로 주류 영화와 음악에 집중하고 있습니다.',
    '미술과 독립 영화 같은 틈새 콘텐츠가 숨겨져 있을 가능성이 높습니다.',
    '다양성 점수를 높이기 위해 새로운 장르를 탐색해보세요.',
  ],
  generatedAt: new Date('2026-05-08'),
};

/**
 * 더미 반추천 항목
 */
export const dummyAntiRecommendations: AntiRecommendation[] = [
  {
    id: 'anti-1',
    title: '독립 다큐멘터리 영화제',
    description: '전 세계 독립 영화 제작자들의 작품을 소개하는 영화제입니다.',
    category: '영화',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
    reason: '알고리즘이 주류 영화에 집중하여 독립 영화를 숨겼습니다.',
    discoveryScore: 85,
  },
  {
    id: 'anti-2',
    title: '현대 미술 설치 미술',
    description: '공간과 관객의 상호작용을 중심으로 하는 현대 미술 작품들입니다.',
    category: '미술',
    image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=400&h=300&fit=crop',
    reason: '시각 예술 콘텐츠가 당신의 피드에서 거의 나타나지 않습니다.',
    discoveryScore: 78,
  },
  {
    id: 'anti-3',
    title: '인디 뮤지션 콜라보레이션',
    description: '독립 음악가들의 실험적인 협업 프로젝트입니다.',
    category: '음악',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    reason: '메인스트림 음악만 추천되고 있습니다.',
    discoveryScore: 72,
  },
  {
    id: 'anti-4',
    title: '소설 번역 프로젝트',
    description: '아시아 신진 작가들의 작품을 번역하는 프로젝트입니다.',
    category: '책',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop',
    reason: '서양 문학에 편향된 추천이 이루어지고 있습니다.',
    discoveryScore: 68,
  },
  {
    id: 'anti-5',
    title: '인디 게임 개발자 커뮤니티',
    description: '소규모 게임 개발자들의 창작물과 경험을 공유하는 커뮤니티입니다.',
    category: '게임',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
    reason: '대작 게임만 추천되고 인디 게임이 숨겨져 있습니다.',
    discoveryScore: 75,
  },
];




/**
 * 더미 특징 데이터
 */
export const dummyFeatures = [
  {
    number: '01',
    title: 'Bubble Audit',
    description: '당신의 피드, 당신이 정의하지 않습니다. 알고리즘 버블을 감사하고 분석해보세요.',
    details: [
      '버블 강도 분석',
      '다양성 점수 측정',
      '추천 편향 감지',
    ],
  },
  {
    number: '02',
    title: 'Cultural Spectrum Map',
    description: '인문 콘텐츠 스펙트럼을 맵으로 분석하고 당신의 문화 프로필을 시각화하세요.',
    details: [
      '카테고리별 분석',
      '시각적 스펙트럼 맵',
      '숨겨진 카테고리 발견',
    ],
  },
  {
    number: '03',
    title: 'Anti-Recommendation Roulette',
    description: '알고리즘이 숨긴 문화를 룰렛으로 발견하고 새로운 취향을 찾아보세요.',
    details: [
      '반추천 항목 제시',
      '발견 점수 평가',
      '문화 다양성 증진',
    ],
  },
];
