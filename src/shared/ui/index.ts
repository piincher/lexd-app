/**
 * Shared UI Components - Design System Primitives
 * 
 * This module provides reusable UI components built on react-native-paper.
 * These are simplified wrappers that maintain API compatibility with 
 * the existing components/ui components.
 * 
 * @example
 * import { Button, Input, Card } from '@src/shared/ui';
 * 
 * <Button title="Submit" onPress={handleSubmit} variant="primary" />
 * <Input label="Email" value={email} onChangeText={setEmail} />
 * <Card><Text>Content</Text></Card>
 */

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
export { Input, type InputProps, type InputVariant, type InputSize } from './Input';
export { Card, type CardProps, type CardVariant, type CardPadding } from './Card';
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from './Badge';
export { Screen, type ScreenProps, type ScreenVariant } from './Screen';
export { Checkbox, type CheckboxProps, type CheckboxSize } from './Checkbox';
export { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog';
export { EmptyState, type EmptyStateProps } from './EmptyState';
export { ShimmerBlock } from './ShimmerBlock';
export { GoodsPhotosUpload, type GoodsPhotosUploadProps } from './GoodsPhotosUpload';
export { PhotoGallery, type PhotoGalleryProps } from './PhotoGallery';
export { GoodsImage, type GoodsImageProps } from './GoodsImage';

export { AppHeader, type AppHeaderProps } from './app-header';

export { GlobalLoadingOverlay } from './global-loading-overlay';

export { Loading, Skeleton, type LoadingProps, type SkeletonProps } from './Loading';
export { ThemeToggle, type ThemeToggleProps } from './ThemeToggle';
export { StatusBar, FixedStatusBar, type StatusBarProps } from './StatusBar';
export { LoadingSpinner } from './LoadingSpinner';
export { DateRangePicker, type DateRange, type DateRangePreset } from './DateRangePicker';
export { CustomModal } from './Modal';
export { Notification } from './Notification';
export { DetailRow } from './DetailsRow';
export { ListItem } from './ListItem';
export { default as AppButton } from './AppButton';
export { default as AppLink } from './AppLink';
export { default as CompanyLogo } from './CompanyLogo';
export { default as CopyrightText } from './CopyrightText';
export { default as CircleUI } from './CircleUI';
export { default as SearchBar } from './SearchBar';
export { default as ImageSlider } from './ImageSlider';
export { default as SocialMedia } from './SocialMedia';
