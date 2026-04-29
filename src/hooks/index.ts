/**
 * Custom Hooks - Public API
 * Backward-compatible re-exports from FSD locations
 */

// Theme hooks
export {
  useAppTheme,
  useThemeStyles,
  useThemeColors,
  useIsDarkMode,
  useThemeColor,
  useThemedStyles,
  useThemeToggle,
  useShadowStyles,
  useBorderRadius,
  useSpacing,
  useCardStyles,
  useTextStyles,
} from '@src/shared/lib/hooks/useTheme';

// User hooks
export { useGetUser } from '@src/features/users/hooks/useGetUser';

// Announcement hooks
export { useAddAnoncement, useFetchAnnouncement } from '@src/features/announcements/hooks/useAnnouncement';

// Clipboard hooks
export { useClipboard } from '@src/shared/lib/hooks/useClipboard';

// Confirmation hooks
export { useConfirmationNotification } from '@src/shared/lib/hooks/useConfirmation';
