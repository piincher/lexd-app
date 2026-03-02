/**
 * UI Components - Reusable Design System
 * 
 * This module provides a comprehensive set of reusable UI components
 * following atomic design principles and accessibility standards.
 * 
 * @example
 * import { Button, Input, Card, Loading } from '@src/components/ui';
 * 
 * <Button 
 *   title="Submit" 
 *   onPress={handleSubmit}
 *   variant="primary"
 *   size="medium"
 * />
 */

// Button Component
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button/Button';

// Input Component
export { Input, type InputProps, type InputVariant, type InputSize } from './Input/Input';

// Card Component
export { Card, type CardProps, type CardVariant, type CardPadding } from './Card/Card';

// Loading Components
export { Loading, Skeleton, type LoadingProps, type SkeletonProps } from './Loading/Loading';

// Badge Component
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from './Badge/Badge';

// Theme Components
export { ThemeToggle, type ThemeToggleProps } from '../ThemeToggle';
export { StatusBar, FixedStatusBar, type StatusBarProps } from '../StatusBar';
