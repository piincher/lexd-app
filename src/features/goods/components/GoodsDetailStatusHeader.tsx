import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { GoodsStatus } from '../api';
import { StatusBadge } from './StatusBadge';
import { formatDate, getShippingModeConfig } from '../lib/goodsHelpers';

interface GoodsDetailStatusHeaderProps {
	status: GoodsStatus;
	shippingMode?: string;
	date?: string;
}

export const GoodsDetailStatusHeader: React.FC<GoodsDetailStatusHeaderProps> = ({
	status,
	shippingMode,
	date,
}) => {
	const { colors } = useAppTheme();
	const config = getShippingModeConfig(shippingMode);

	return (
		<View style={[styles.container, { backgroundColor: colors.background.card }]}>
			<View style={styles.left}>
				<StatusBadge status={status} />
				<View style={[styles.badge, { backgroundColor: config.color + '20' }]}>
					<MaterialCommunityIcons name={config.icon} size={16} color={config.color} />
					<Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
				</View>
			</View>
			<Text style={[styles.date, { color: colors.text.secondary }]}>{formatDate(date)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginBottom: 8,
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 4,
	},
	badgeText: {
		fontFamily: Fonts.bold,
		fontSize: 12,
	},
	date: {
		fontFamily: Fonts.regular,
		fontSize: 11,
	},
});
