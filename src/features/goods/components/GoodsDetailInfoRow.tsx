import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './GoodsDetailInfo.styles';

interface GoodsDetailInfoRowProps {
	label: string;
	children: React.ReactNode;
}

export const GoodsDetailInfoRow: React.FC<GoodsDetailInfoRowProps> = ({ label, children }) => {
	const { colors } = useAppTheme();

	return (
		<View style={styles.infoRow}>
			<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>{label}</Text>
			{children}
		</View>
	);
};
