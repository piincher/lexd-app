import { ThemeMode } from '@src/constants/Theme';

export const getCurrentIcon = (theme: ThemeMode, isDark: boolean) => {
  switch (theme) {
    case 'light':
      return { name: 'sun', type: 'fa6' };
    case 'dark':
      return { name: 'moon', type: 'fa6' };
    case 'system':
      return { name: 'mobile-screen', type: 'fa6' };
    default:
      return { name: isDark ? 'moon' : 'sun', type: 'fa6' };
  }
};
