import { getAppThemeMode } from './themeState';

const lightColors = {
	// colors used in signup form,
	inputBorder: '#c4d7e7',
	placeHolder: '#839fc0',
	success: '#16A34A',
	danger: '#DC2626',
	heading: '#15803D',
	text: '#166534',
	link: '#D4AF37',
	black: '#000000',
	// colors to be used
	lightergray: '#E8EFF5',
	Crimson: '#16A34A',
	lightCrimson: '#DCFCE7',
	DarkGrey: '#14532D',
	DimGray: '#166534',
	SlateGray: '#86EFAC',
	Silver: '#e8eff5',
	FeatherWhite: '#f7f9ff',
	lightyellow: '#F4D03F',
	white: '#ffffff',
	yellow: '#D4AF37',
	orange: '#B8860B',
	grey: '#8E8E8F',
	navy: '#14532D',
	influencercardcolor: '#f6f9ff',
	lightGray: '#898989',
	 lightBackground: '#F0FDF4',
	border: '#BBF7D0',

	// extras
	extra1: '#F0FDF4',
	extra2: '#FAFCFF',
	terms: '#16A34A',
	green: '#22C55E',
	terms2: '#15803D',
	//transparent
	blueTransparent: 'rgba(20, 83, 45, 0.5)',
	dont: '#166534',

	//profile screen
	blueShade: '#16A34A',
	blue: '#22C55E',
	purpleShade: '#D4AF37',
	orangeShade: '#B8860B',
	redShade: '#DC2626',
	
	// New theme colors matching logo
	gold: '#D4AF37',
	goldLight: '#F4D03F',
	goldDark: '#B8860B',
	redLight: '#EF4444',

	// Additional properties used by components
	shadow: '#000000',
	dark: '#1F2937',
};

const darkColors = {
	// colors used in signup form,
	inputBorder: '#374151',
	placeHolder: '#9CA3AF',
	success: '#4ADE80',
	danger: '#EF4444',
	heading: '#86EFAC',
	text: '#BBF7D0',
	link: '#F4D03F',
	black: '#F9FAFB',
	// colors to be used
	lightergray: '#1F2937',
	Crimson: '#4ADE80',
	lightCrimson: '#14532D',
	DarkGrey: '#E5E7EB',
	DimGray: '#D1D5DB',
	SlateGray: '#15803D',
	Silver: '#374151',
	FeatherWhite: '#0F172A',
	lightyellow: '#F4D03F',
	white: '#0F172A',
	yellow: '#F4D03F',
	orange: '#F7DC6F',
	grey: '#9CA3AF',
	navy: '#86EFAC',
	influencercardcolor: '#1E293B',
	lightGray: '#D1D5DB',
	 lightBackground: '#14532D',
	border: '#15803D',

	// extras
	extra1: '#14532D',
	extra2: '#1E293B',
	terms: '#4ADE80',
	green: '#4ADE80',
	terms2: '#86EFAC',
	//transparent
	blueTransparent: 'rgba(134, 239, 172, 0.5)',
	dont: '#BBF7D0',

	//profile screen
	blueShade: '#4ADE80',
	blue: '#4ADE80',
	purpleShade: '#D4AF37',
	orangeShade: '#F7DC6F',
	redShade: '#EF4444',
	
	// New theme colors matching logo
	gold: '#F4D03F',
	goldLight: '#F7DC6F',
	goldDark: '#D4AF37',
	redLight: '#F87171',

	// Additional properties used by components
	shadow: '#000000',
	dark: '#F9FAFB',
} as typeof lightColors;

/**
 * Theme-aware COLORS that automatically adapt to the current color scheme.
 * Accessing any property returns the light or dark variant based on Appearance.
 */
export const COLORS = new Proxy({} as Record<keyof typeof lightColors, string>, {
	get(_, prop) {
		if (typeof prop !== 'string') return undefined;
		const scheme = getAppThemeMode();
		const source = scheme === 'dark' ? darkColors : lightColors;
		return source[prop as keyof typeof lightColors] ?? lightColors[prop as keyof typeof lightColors];
	},
});

export default COLORS;
