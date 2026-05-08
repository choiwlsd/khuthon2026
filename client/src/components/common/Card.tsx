/**
 * Card Component
 * 
 * Digi-Kaleidos 서비스의 기본 카드 컴포넌트입니다.
 * 콘텐츠를 그룹화하고 시각적 구조를 제공합니다.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 호버 효과 활성화 */
  hoverable?: boolean;
  /** 카드 패딩 */
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card: 기본 카드 컴포넌트
 * 
 * 흰색 배경과 부드러운 그림자로 깔끔한 카드를 제공합니다.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, padding = 'md', className, ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-card text-card-foreground rounded-lg border border-border shadow-sm transition-smooth',
          hoverable && 'hover-lift cursor-pointer',
          paddingClasses[padding],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader: 카드 헤더
 * 
 * 카드의 제목과 설명을 포함하는 헤더 영역입니다.
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle: 카드 제목
 * 
 * 카드의 주요 제목입니다.
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold text-foreground', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription: 카드 설명
 * 
 * 카드의 부가 설명입니다.
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground mt-1', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/**
 * CardContent: 카드 콘텐츠
 * 
 * 카드의 주요 콘텐츠 영역입니다.
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));

CardContent.displayName = 'CardContent';

/**
 * CardFooter: 카드 푸터
 * 
 * 카드의 하단 영역으로, 주로 버튼이나 액션을 포함합니다.
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between mt-6 pt-4 border-t border-border', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export default Card;
