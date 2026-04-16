/**
 * Custom Hooks - Public API
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
} from './useTheme';

// User hooks
export { useGetUser } from './useGetUser';

// Announcement hooks
export { useAddAnoncement, useFetchAnnouncement } from './useAnnouncement';

// Clipboard hooks
export { useClipBoard } from './useClipBoard';

// Confirmation hooks
export { useConfirmation } from './useConfirmation';
