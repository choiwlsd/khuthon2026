import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatDate: 날짜 포맷팅
 * 
 * 주어진 날짜를 한국 형식으로 포맷합니다.
 */
export function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? '2-digit' : 'long',
    day: '2-digit',
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
}

/**
 * formatTime: 시간 포맷팅
 * 
 * 주어진 시간을 HH:MM 형식으로 포맷합니다.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * formatNumber: 숫자 포맷팅
 * 
 * 주어진 숫자를 천 단위 구분자와 함께 포맷합니다.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * calculatePercentage: 백분율 계산
 * 
 * 주어진 값과 전체 값으로 백분율을 계산합니다.
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * truncateText: 텍스트 자르기
 * 
 * 주어진 길이를 초과하는 텍스트를 자르고 말줄임표를 추가합니다.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * debounce: 디바운싱
 * 
 * 함수의 실행을 지연시켜 불필요한 호출을 방지합니다.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * throttle: 쓰로틀링
 * 
 * 함수의 실행 빈도를 제한합니다.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * getInitials: 이름의 이니셜 추출
 * 
 * 주어진 이름에서 이니셜을 추출합니다.
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * generateId: 고유 ID 생성
 * 
 * 고유한 ID를 생성합니다.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * sleep: 비동기 지연
 * 
 * 주어진 시간만큼 지연합니다.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
