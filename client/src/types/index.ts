/**
 * Digi-Kaleidos Type Definitions
 * 
 * Core data models and interfaces for the application.
 * Includes Mission, Spectrum, User, and related types.
 */

/**
 * Mission: 사용자 문화 분석 미션
 * 
 * 사용자가 완료해야 할 문화 분석 작업을 정의합니다.
 * Bubble Audit, Cultural Spectrum Map, Anti-Recommendation Roulette 등의 미션이 있습니다.
 */
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'audit' | 'map' | 'roulette';
  icon: string;
  completed: boolean;
  progress: number; // 0-100
  estimatedTime: number; // minutes
  category: string;
}

/**
 * SpectrumCategory: 문화 스펙트럼 카테고리
 * 
 * 사용자의 문화적 취향을 분류하는 카테고리입니다.
 * 영화, 음악, 책, 미술, 게임 등이 포함됩니다.
 */
export interface SpectrumCategory {
  id: string;
  name: string;
  label: string;
  description: string;
  color: string; // Hex color code
  icon: string;
  percentage: number; // 0-100
}

/**
 * CulturalSpectrum: 사용자의 전체 문화 스펙트럼
 * 
 * 사용자가 분석한 문화적 취향의 전체 프로필입니다.
 */
export interface CulturalSpectrum {
  userId: string;
  categories: SpectrumCategory[];
  totalAnalyzed: number;
  lastUpdated: Date;
  insights: string[];
}

/**
 * BubbleAuditResult: 버블 감사 결과
 * 
 * 사용자의 알고리즘 버블을 분석한 결과입니다.
 * 버블 강도, 다양성 점수, 추천 분석 등을 포함합니다.
 */
export interface BubbleAuditResult {
  userId: string;
  bubbleStrength: number; // 0-100 (높을수록 강한 버블)
  diversityScore: number; // 0-100 (높을수록 다양함)
  recommendationBias: number; // 0-100 (높을수록 편향됨)
  topCategories: string[];
  hiddenCategories: string[];
  insights: string[];
  generatedAt: Date;
}

/**
 * AntiRecommendation: 반추천 항목
 * 
 * 알고리즘이 숨긴 문화 콘텐츠입니다.
 */
export interface AntiRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  reason: string; // 왜 숨겨졌는지 설명
  discoveryScore: number; // 0-100 (발견 가치)
}

/**
 * RouletteResult: 룰렛 결과
 * 
 * Anti-Recommendation Roulette에서 선택된 항목입니다.
 */
export interface RouletteResult {
  id: string;
  item: AntiRecommendation;
  selectedAt: Date;
  userRating?: number; // 1-5 stars
  feedback?: string;
}

/**
 * User: 사용자 정보
 * 
 * 애플리케이션 사용자의 기본 정보입니다.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  preferences: UserPreferences;
  statistics: UserStatistics;
}

/**
 * UserPreferences: 사용자 설정
 * 
 * 사용자의 앱 사용 설정입니다.
 */
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
  notificationsEnabled: boolean;
  dataCollection: boolean;
}

/**
 * UserStatistics: 사용자 통계
 * 
 * 사용자의 활동 통계입니다.
 */
export interface UserStatistics {
  totalMissionsCompleted: number;
  totalItemsDiscovered: number;
  averageDiversityScore: number;
  lastActivityDate: Date;
}

/**
 * DiagnosticLog: 진단 로그
 * 
 * 사용자 행동 및 시스템 진단 정보를 기록합니다.
 */
export interface DiagnosticLog {
  id: string;
  userId: string;
  timestamp: Date;
  eventType: 'page_view' | 'mission_start' | 'mission_complete' | 'item_discover' | 'error' | 'performance';
  eventData: Record<string, any>;
  metadata: {
    userAgent: string;
    screenResolution: string;
    performanceMetrics?: {
      loadTime: number;
      renderTime: number;
      interactionTime: number;
    };
  };
}

/**
 * AnalyticsData: 분석 데이터
 * 
 * 수집된 진단 데이터를 분석한 결과입니다.
 */
export interface AnalyticsData {
  userId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalEvents: number;
    uniqueSessions: number;
    averageSessionDuration: number;
    completionRate: number;
  };
  eventDistribution: Record<string, number>;
  performanceMetrics: {
    averageLoadTime: number;
    averageRenderTime: number;
    averageInteractionTime: number;
  };
}

/**
 * PageViewEvent: 페이지 조회 이벤트
 * 
 * 사용자가 페이지를 조회했을 때의 이벤트입니다.
 */
export interface PageViewEvent extends DiagnosticLog {
  eventType: 'page_view';
  eventData: {
    pageName: string;
    pageUrl: string;
    referrer?: string;
  };
}

/**
 * MissionEvent: 미션 관련 이벤트
 * 
 * 사용자가 미션을 시작하거나 완료했을 때의 이벤트입니다.
 */
export interface MissionEvent extends DiagnosticLog {
  eventType: 'mission_start' | 'mission_complete';
  eventData: {
    missionId: string;
    missionType: string;
    duration?: number;
    result?: any;
  };
}

/**
 * ErrorEvent: 에러 이벤트
 * 
 * 애플리케이션에서 발생한 에러를 기록합니다.
 */
export interface ErrorEvent extends DiagnosticLog {
  eventType: 'error';
  eventData: {
    errorMessage: string;
    errorStack?: string;
    errorCode?: string;
    severity: 'low' | 'medium' | 'high';
  };
}
