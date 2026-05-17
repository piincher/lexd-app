import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './GoodsDetailInfo.styles';

interface GoodsDetailInfoBadgeProps {
	icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	text: string;
}

export const GoodsDetailInfoBadge: React.FC<GoodsDetailInfoBadgeProps> = ({ icon, text }) => {
	const { colors } = useAppTheme();

	return (
		<View style={[styles.badge, { backgroundColor: colors.primary.main + '15' }]}>
			<MaterialCommunityIcons name={icon} size={14} color={colors.primary.main} />
			<Text style={[styles.badgeText, { color: colors.primary.main }]}>{text}</Text>
		</View>
	);
};
