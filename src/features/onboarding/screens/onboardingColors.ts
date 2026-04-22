const darkenHex = (hex: string): string => {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  const channels = [
    Math.round(((value >> 16) & 255) * 0.72),
    Math.round(((value >> 8) & 255) * 0.72),
    Math.round((value & 255) * 0.72),
  ];

  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
};

export const getOnboardingBackgroundColors = (colors: string[], isDark: boolean) =>
  isDark ? colors.map(darkenHex) : colors;
