/**
 * Shared theme state for reactive static exports
 *
 * This module provides a mutable theme mode that both:
 * - React components (via ThemeProvider) can read/write
 * - Static exports like `Theme` and `COLORS` can read reactively
 *
 * This bridges the gap between React state and module-level theme access.
 */

export type AppThemeMode = 'light' | 'dark';

let _currentMode: AppThemeMode = 'light';
const _listeners = new Set<() => void>();

export function setAppThemeMode(mode: AppThemeMode) {
  if (_currentMode !== mode) {
    _currentMode = mode;
    _listeners.forEach((cb) => cb());
  }
}

export function getAppThemeMode(): AppThemeMode {
  return _currentMode;
}

export function subscribeToThemeChanges(cb: () => void): () => void {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}
