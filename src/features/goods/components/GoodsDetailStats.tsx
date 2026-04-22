import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface GoodsDetailStatsProps {
	cbm?: number;
	weight?: number;
	quantity?: number;
}

export const GoodsDetailStats: React.FC<GoodsDetailStatsProps> = ({ cbm, weight, quantity }) => {
	const { colors } = useAppTheme();

	return (
		<View style={[styles.row, { backgroundColor: colors.background.card }]}>
			<View style={styles.statBox}>
				<MaterialCommunityIcons name="cube-outline" size={22} color={colors.status.success} />
				<Text style={[styles.statValue, { color: colors.text.primary }]}>{(cbm ?? 0).toFixed(3)}</Text>
				<Text style={[styles.statLabel, { color: colors.text.secondary }]}>CBM (m³)</Text>
			</View>
			<View style={[styles.divider, { backgroundColor: colors.border }]} />
			<View style={styles.statBox}>
				<MaterialCommunityIcons name="weight" size={22} color={colors.status.success} />
				<Text style={[styles.statValue, { color: colors.text.primary }]}>{weight ?? 0} kg</Text>
				<Text style={[styles.statLabel, { color: colors.text.secondary }]}>Poids</Text>
			</View>
			<View style={[styles.divider, { backgroundColor: colors.border }]} />
			<View style={styles.statBox}>
				<MaterialCommunityIcons name="package-variant-closed" size={22} color={colors.status.success} />
				<Text style={[styles.statValue, { color: colors.text.primary }]}>{quantity ?? 0}</Text>
				<Text style={[styles.statLabel, { color: colors.text.secondary }]}>Quantité</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginHorizontal: 16,
		marginBottom: 12,
		borderRadius: 12,
		paddingVertical: 16,
		elevation: 1,
	},
	statBox: {
		flex: 1,
		alignItems: 'center',
	},
	statValue: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		marginTop: 4,
	},
	statLabel: {
		fontFamily: Fonts.regular,
		fontSize: 11,
		marginTop: 2,
	},
	divider: {
		width: 1,
	},
});
