/**
 * Client utility functions
 * @module features/admin/users/lib/clientUtils
 */

/**
 * Get initials from first and last name
 */
export const getInitials = (firstName?: string, lastName?: string): string => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

/**
 * Avatar gradient colors
 */
const AVATAR_COLORS: Array<[string, string]> = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#30cfd0", "#330867"],
  ["#a8edea", "#fed6e3"],
  ["#ff9a9e", "#fecfef"],
];

/**
 * Generate consistent avatar color based on name
 */
export const getAvatarColor = (name?: string): [string, string] => {
  if (!name) return AVATAR_COLORS[0];
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
};
