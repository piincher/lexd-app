import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createJourneyMapStyles = (colors: Colors) =>
	StyleSheet.create({
		container: { marginTop: 28, paddingHorizontal: 16 },
		header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
		title: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
		totalBadge: {
			backgroundColor: `${colors.primary.main}12`,
			borderRadius: 8,
			paddingHorizontal: 10,
			paddingVertical: 4,
		},
		totalText: { fontSize: 12, fontWeight: '700', color: colors.primary.main },
		scroll: { marginHorizontal: -16, paddingHorizontal: 16 },
		track: { flexDirection: 'row', alignItems: 'flex-start' },
		stage: { alignItems: 'center', width: 72 },
		dotWrapper: {
			width: 40,
			height: 40,
			borderRadius: 20,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2.5,
		},
		pulse: {
			position: 'absolute',
			width: 40,
			height: 40,
			borderRadius: 20,
		},
		line: {
			width: 32,
			height: 3,
			borderRadius: 2,
			marginTop: 18,
		},
		label: { fontSize: 10, fontWeight: '700', marginTop: 8, textAlign: 'center' },
		count: { fontSize: 12, fontWeight: '800', marginTop: 2 },
		emptyState: {
			alignItems: 'center',
			paddingVertical: 32,
			borderRadius: 16,
			marginHorizontal: 16,
			gap: 8,
		},
		emptyTitle: { fontSize: 14, fontWeight: '700', marginTop: 4 },
		emptyText: { fontSize: 12, textAlign: 'center', paddingHorizontal: 24 },
	});
