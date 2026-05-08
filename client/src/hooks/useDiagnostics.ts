/**
 * useDiagnostics Hook
 * 
 * 사용자 행동 및 시스템 성능 진단 데이터를 수집하고 관리합니다.
 * 페이지 조회, 미션 완료, 에러 등의 이벤트를 추적합니다.
 */

import { useEffect, useRef, useCallback } from 'react';
import type {
  DiagnosticLog,
  PageViewEvent,
  MissionEvent,
  ErrorEvent,
} from '@/types';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

/**
 * useDiagnostics: 진단 데이터 수집 및 관리
 * 
 * 사용자 행동, 성능 메트릭, 에러를 추적하고 로컬 스토리지에 저장합니다.
 */
export const useDiagnostics = (userId: string) => {
  const logsRef = useRef<DiagnosticLog[]>([]);
  const performanceRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
  });

  /**
   * 진단 로그를 로컬 스토리지에 저장
   */
  const saveLogs = useCallback(() => {
    try {
      const existingLogs = localStorage.getItem('diagnosticLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      const updatedLogs = [...logs, ...logsRef.current];
      
      // 최대 1000개의 로그만 유지
      const trimmedLogs = updatedLogs.slice(-1000);
      localStorage.setItem('diagnosticLogs', JSON.stringify(trimmedLogs));
      
      logsRef.current = [];
    } catch (error) {
      console.error('Failed to save diagnostic logs:', error);
    }
  }, []);

  /**
   * 페이지 조회 이벤트 기록
   */
  const logPageView = useCallback((pageName: string, pageUrl: string) => {
    const event: PageViewEvent = {
      id: `log-${Date.now()}-${Math.random()}`,
      userId,
      timestamp: new Date(),
      eventType: 'page_view',
      eventData: {
        pageName,
        pageUrl,
        referrer: document.referrer,
      },
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        performanceMetrics: performanceRef.current,
      },
    };
    logsRef.current.push(event);
  }, [userId]);

  /**
   * 미션 시작 이벤트 기록
   */
  const logMissionStart = useCallback((missionId: string, missionType: string) => {
    const event: MissionEvent = {
      id: `log-${Date.now()}-${Math.random()}`,
      userId,
      timestamp: new Date(),
      eventType: 'mission_start',
      eventData: {
        missionId,
        missionType,
      },
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      },
    };
    logsRef.current.push(event);
  }, [userId]);

  /**
   * 미션 완료 이벤트 기록
   */
  const logMissionComplete = useCallback(
    (missionId: string, missionType: string, duration: number, result?: any) => {
      const event: MissionEvent = {
        id: `log-${Date.now()}-${Math.random()}`,
        userId,
        timestamp: new Date(),
        eventType: 'mission_complete',
        eventData: {
          missionId,
          missionType,
          duration,
          result,
        },
        metadata: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.innerWidth}x${window.innerHeight}`,
          performanceMetrics: performanceRef.current,
        },
      };
      logsRef.current.push(event);
    },
    [userId]
  );

  /**
   * 항목 발견 이벤트 기록
   */
  const logItemDiscovery = useCallback((itemId: string, itemType: string, category: string) => {
    const event: DiagnosticLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      userId,
      timestamp: new Date(),
      eventType: 'item_discover',
      eventData: {
        itemId,
        itemType,
        category,
      },
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      },
    };
    logsRef.current.push(event);
  }, [userId]);

  /**
   * 에러 이벤트 기록
   */
  const logError = useCallback(
    (errorMessage: string, errorStack?: string, severity: 'low' | 'medium' | 'high' = 'medium') => {
      const event: ErrorEvent = {
        id: `log-${Date.now()}-${Math.random()}`,
        userId,
        timestamp: new Date(),
        eventType: 'error',
        eventData: {
          errorMessage,
          errorStack,
          severity,
        },
        metadata: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        },
      };
      logsRef.current.push(event);
    },
    [userId]
  );

  /**
   * 성능 메트릭 업데이트
   */
  const updatePerformanceMetrics = useCallback(
    (metrics: Partial<PerformanceMetrics>) => {
      performanceRef.current = {
        ...performanceRef.current,
        ...metrics,
      };
    },
    []
  );

  /**
   * 페이지 언로드 시 로그 저장
   */
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveLogs();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveLogs]);

  /**
   * 일정 시간마다 로그 저장 (자동 저장)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (logsRef.current.length > 0) {
        saveLogs();
      }
    }, 30000); // 30초마다 저장

    return () => clearInterval(interval);
  }, [saveLogs]);

  return {
    logPageView,
    logMissionStart,
    logMissionComplete,
    logItemDiscovery,
    logError,
    updatePerformanceMetrics,
    saveLogs,
  };
};

/**
 * usePerformanceMonitoring: 페이지 성능 모니터링
 * 
 * 페이지 로드 시간, 렌더링 시간, 상호작용 시간을 측정합니다.
 */
export const usePerformanceMonitoring = () => {
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const handleLoad = () => {
      const loadTime = performance.now() - startTimeRef.current;
      console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const measureRenderTime = useCallback(() => {
    const renderTime = performance.now() - startTimeRef.current;
    console.log(`Render time: ${renderTime.toFixed(2)}ms`);
    return renderTime;
  }, []);

  return { measureRenderTime };
};

/**
 * useErrorTracking: 에러 추적
 * 
 * 전역 에러 및 언처리된 Promise 거부를 추적합니다.
 */
export const useErrorTracking = (onError: (error: string, stack?: string) => void) => {
  useEffect(() => {
    const handleError = (event: Event) => {
      const errorEvent = event as unknown as { message?: string; error?: { stack?: string } };
      onError(
        errorEvent.message || 'Unknown error',
        errorEvent.error?.stack
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      onError(
        `Unhandled Promise Rejection: ${event.reason}`,
        event.reason?.stack
      );
    };

    window.addEventListener('error', handleError as EventListener);
    window.addEventListener('unhandledrejection', handleUnhandledRejection as EventListener);

    return () => {
      window.removeEventListener('error', handleError as EventListener);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection as EventListener);
    };
  }, [onError]);
};
