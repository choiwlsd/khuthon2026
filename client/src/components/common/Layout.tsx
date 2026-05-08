/**
 * Layout Component
 * 
 * Digi-Kaleidos 서비스의 기본 레이아웃 컴포넌트입니다.
 * 헤더, 네비게이션, 메인 콘텐츠, 푸터를 포함합니다.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout: 기본 페이지 레이아웃
 * 
 * 전체 페이지 구조를 제공합니다.
 */
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      {children}
    </div>
  );
};

/**
 * Header: 페이지 헤더
 * 
 * 로고와 네비게이션을 포함하는 헤더입니다.
 */
export const Header: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-background border-b border-border shadow-sm',
        className
      )}
    >
      <div className="container flex items-center justify-between h-16">
        {children}
      </div>
    </header>
  );
};

/**
 * Nav: 네비게이션
 * 
 * 사이트의 주요 네비게이션을 제공합니다.
 */
export const Nav: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {children}
    </nav>
  );
};

/**
 * Main: 메인 콘텐츠 영역
 * 
 * 페이지의 주요 콘텐츠를 포함합니다.
 */
export const Main: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <main className={cn('flex-1 container py-8', className)}>
      {children}
    </main>
  );
};

/**
 * Section: 섹션 컴포넌트
 * 
 * 페이지를 논리적 섹션으로 나눕니다.
 */
interface SectionProps extends LayoutProps {
  title?: string;
  description?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  id,
  className,
}) => {
  return (
    <section
      id={id}
      className={cn('py-12 md:py-16 lg:py-20 relative', className)}
    >
      <div className="container">
        {(title || description) && (
          <div className="mb-8 md:mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

/**
 * Footer: 페이지 푸터
 * 
 * 사이트의 하단 정보를 포함합니다.
 */
export const Footer: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <footer
      className={cn(
        'bg-secondary border-t border-border mt-auto',
        className
      )}
    >
      <div className="container py-8 md:py-12">
        {children}
      </div>
    </footer>
  );
};

/**
 * Container: 콘텐츠 컨테이너
 * 
 * 콘텐츠를 중앙 정렬하고 최대 너비를 제한합니다.
 */
export const Container: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('container', className)}>
      {children}
    </div>
  );
};

/**
 * Grid: 그리드 레이아웃
 * 
 * 반응형 그리드 레이아웃을 제공합니다.
 */
interface GridProps extends LayoutProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Flex: 플렉스 레이아웃
 * 
 * 플렉스 레이아웃을 제공합니다.
 */
interface FlexProps extends LayoutProps {
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'between' | 'around' | 'end';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'sm' | 'md' | 'lg';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = 'md',
  className,
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    end: 'justify-end',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
