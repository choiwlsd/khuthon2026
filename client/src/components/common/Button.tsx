/**
 * Button Component
 * 
 * Digi-Kaleidos 서비스의 기본 버튼 컴포넌트입니다.
 * 다양한 크기, 색상, 상태를 지원합니다.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode;
  /** 아이콘 위치 */
  iconPosition?: 'left' | 'right';
}

/**
 * Button: 기본 버튼 컴포넌트
 * 
 * 신뢰감 있는 인디고 색상과 부드러운 호버 효과를 제공합니다.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95',
      outline:
        'border-2 border-primary text-primary hover:bg-primary/5 active:scale-95',
      ghost:
        'text-primary hover:bg-primary/10 active:scale-95',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {icon && iconPosition === 'left' && !isLoading && icon}
        {children}
        {icon && iconPosition === 'right' && !isLoading && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
