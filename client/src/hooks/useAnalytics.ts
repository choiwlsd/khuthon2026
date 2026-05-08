/**
 * useAnalytics Hook
 * 
 * 수집된 진단 데이터를 분석하고 통계를 생성합니다.
 * 사용자 행동 패턴, 성능 메트릭, 이벤트 분포 등을 분석합니다.
 */

import { useMemo } from 'react';
import type { DiagnosticLog, AnalyticsData } from '@/types';

/**
 * useAnalytics: 진단 데이터 분석
 * 
 * 저장된 진단 로그를 분석하여 통계 데이터를 생성합니다.
 */
export const useAnalytics = (userId: string) => {
  const analyticsData = useMemo(() => {
    try {
      const logsJson = localStorage.getItem('diagnosticLogs');
      const logs: DiagnosticLog[] = logsJson ? JSON.parse(logsJson) : [];

      // 사용자별 로그 필터링
      const userLogs = logs.filter((log) => log.userId === userId);

      if (userLogs.length === 0) {
        return null;
      }

      // 시간 범위 계산
      const timestamps = userLogs.map((log) => new Date(log.timestamp).getTime());
      const startDate = new Date(Math.min(...timestamps));
      const endDate = new Date(Math.max(...timestamps));

      // 이벤트 분포 계산
      const eventDistribution: Record<string, number> = {};
      userLogs.forEach((log) => {
        eventDistribution[log.eventType] = (eventDistribution[log.eventType] || 0) + 1;
      });

      // 성능 메트릭 계산
      const performanceMetrics = {
        averageLoadTime: 0,
        averageRenderTime: 0,
        averageInteractionTime: 0,
      };

      const logsWithMetrics = userLogs.filter((log) => log.metadata?.performanceMetrics);
      if (logsWithMetrics.length > 0) {
        performanceMetrics.averageLoadTime =
          logsWithMetrics.reduce(
            (sum, log) => sum + (log.metadata?.performanceMetrics?.loadTime || 0),
            0
          ) / logsWithMetrics.length;

        performanceMetrics.averageRenderTime =
          logsWithMetrics.reduce(
            (sum, log) => sum + (log.metadata?.performanceMetrics?.renderTime || 0),
            0
          ) / logsWithMetrics.length;

        performanceMetrics.averageInteractionTime =
          logsWithMetrics.reduce(
            (sum, log) => sum + (log.metadata?.performanceMetrics?.interactionTime || 0),
            0
          ) / logsWithMetrics.length;
      }

      // 세션 계산 (30분 이상 간격이 있으면 새 세션)
      const sortedLogs = [...userLogs].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      let sessionCount = 1;
      for (let i = 1; i < sortedLogs.length; i++) {
        const timeDiff =
          new Date(sortedLogs[i].timestamp).getTime() -
          new Date(sortedLogs[i - 1].timestamp).getTime();
        if (timeDiff > 30 * 60 * 1000) {
          sessionCount++;
        }
      }

      // 완료율 계산
      const completedMissions = userLogs.filter(
        (log) => log.eventType === 'mission_complete'
      ).length;
      const startedMissions = userLogs.filter(
        (log) => log.eventType === 'mission_start'
      ).length;
      const completionRate =
        startedMissions > 0 ? Math.round((completedMissions / startedMissions) * 100) : 0;

      const analytics: AnalyticsData = {
        userId,
        period: {
          startDate,
          endDate,
        },
        summary: {
          totalEvents: userLogs.length,
          uniqueSessions: sessionCount,
          averageSessionDuration:
            userLogs.length > 0
              ? Math.round(
                  (endDate.getTime() - startDate.getTime()) / (sessionCount * 60000)
                )
              : 0,
          completionRate,
        },
        eventDistribution,
        performanceMetrics,
      };

      return analytics;
    } catch (error) {
      console.error('Failed to analyze diagnostic data:', error);
      return null;
    }
  }, [userId]);

  return analyticsData;
};

/**
 * useEventStats: 이벤트 통계
 * 
 * 특정 이벤트 타입의 통계를 계산합니다.
 */
export const useEventStats = (userId: string, eventType: string) => {
  const stats = useMemo(() => {
    try {
      const logsJson = localStorage.getItem('diagnosticLogs');
      const logs: DiagnosticLog[] = logsJson ? JSON.parse(logsJson) : [];

      const userLogs = logs.filter(
        (log) => log.userId === userId && log.eventType === eventType
      );

      return {
        count: userLogs.length,
        firstOccurrence: userLogs.length > 0 ? new Date(userLogs[0].timestamp) : null,
        lastOccurrence:
          userLogs.length > 0 ? new Date(userLogs[userLogs.length - 1].timestamp) : null,
        logs: userLogs,
      };
    } catch (error) {
      console.error('Failed to get event stats:', error);
      return {
        count: 0,
        firstOccurrence: null,
        lastOccurrence: null,
        logs: [],
      };
    }
  }, [userId, eventType]);

  return stats;
};

/**
 * usePerformanceStats: 성능 통계
 * 
 * 페이지 성능 메트릭을 분석합니다.
 */
export const usePerformanceStats = (userId: string) => {
  const stats = useMemo(() => {
    try {
      const logsJson = localStorage.getItem('diagnosticLogs');
      const logs: DiagnosticLog[] = logsJson ? JSON.parse(logsJson) : [];

      const userLogs = logs.filter((log) => log.userId === userId);
      const logsWithMetrics = userLogs.filter((log) => log.metadata?.performanceMetrics);

      if (logsWithMetrics.length === 0) {
        return {
          averageLoadTime: 0,
          averageRenderTime: 0,
          averageInteractionTime: 0,
          slowestPage: null,
          fastestPage: null,
        };
      }

      const loadTimes = logsWithMetrics
        .map((log) => log.metadata?.performanceMetrics?.loadTime || 0)
        .filter((time) => time > 0);

      const renderTimes = logsWithMetrics
        .map((log) => log.metadata?.performanceMetrics?.renderTime || 0)
        .filter((time) => time > 0);

      const interactionTimes = logsWithMetrics
        .map((log) => log.metadata?.performanceMetrics?.interactionTime || 0)
        .filter((time) => time > 0);

      return {
        averageLoadTime: loadTimes.length > 0 ? loadTimes.reduce((a, b) => a + b) / loadTimes.length : 0,
        averageRenderTime: renderTimes.length > 0 ? renderTimes.reduce((a, b) => a + b) / renderTimes.length : 0,
        averageInteractionTime: interactionTimes.length > 0 ? interactionTimes.reduce((a, b) => a + b) / interactionTimes.length : 0,
        slowestPage: Math.max(...loadTimes),
        fastestPage: Math.min(...loadTimes),
      };
    } catch (error) {
      console.error('Failed to get performance stats:', error);
      return {
        averageLoadTime: 0,
        averageRenderTime: 0,
        averageInteractionTime: 0,
        slowestPage: null,
        fastestPage: null,
      };
    }
  }, [userId]);

  return stats;
};

/**
 * useErrorStats: 에러 통계
 * 
 * 발생한 에러의 통계를 분석합니다.
 */
export const useErrorStats = (userId: string) => {
  const stats = useMemo(() => {
    try {
      const logsJson = localStorage.getItem('diagnosticLogs');
      const logs: DiagnosticLog[] = logsJson ? JSON.parse(logsJson) : [];

      const userLogs = logs.filter((log) => log.userId === userId && log.eventType === 'error');

      const severityCount = {
        low: 0,
        medium: 0,
        high: 0,
      };

      const errorMessages: Record<string, number> = {};

      userLogs.forEach((log) => {
        const severity = (log.eventData as any)?.severity || 'medium';
        severityCount[severity as keyof typeof severityCount]++;

        const message = (log.eventData as any)?.errorMessage || 'Unknown error';
        errorMessages[message] = (errorMessages[message] || 0) + 1;
      });

      return {
        totalErrors: userLogs.length,
        severityCount,
        errorMessages,
        mostCommonError: Object.entries(errorMessages).sort(([, a], [, b]) => b - a)[0]?.[0] || null,
      };
    } catch (error) {
      console.error('Failed to get error stats:', error);
      return {
        totalErrors: 0,
        severityCount: { low: 0, medium: 0, high: 0 },
        errorMessages: {},
        mostCommonError: null,
      };
    }
  }, [userId]);

  return stats;
};
