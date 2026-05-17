import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createJourneyMapStyles } from './JourneyMap.styles';

interface JourneyStepProps {
	stage: {
		key: string;
		label: string;
		icon: string;
		color: string;
	};
	count: number;
}

export const JourneyStep: React.FC<JourneyStepProps> = ({ stage, count }) => {
	const { colors } = useAppTheme();
	const styles = createJourneyMapStyles(colors);
	const isActive = count > 0;

	return (
		<View style={styles.stage}>
			<View
				style={[
					styles.dotWrapper,
					{
						borderColor: isActive ? stage.color : colors.neutral[300],
						backgroundColor: isActive ? `${stage.color}15` : colors.background.card,
					},
				]}
			>
				{isActive && (
					<View style={[styles.pulse, { backgroundColor: `${stage.color}25` }]} />
				)}
				<Ionicons
					name={stage.icon as any}
					size={isActive ? 18 : 16}
					color={isActive ? stage.color : colors.text.disabled}
				/>
			</View>
			<Text
				style={[
					styles.label,
					{ color: isActive ? colors.text.secondary : colors.text.disabled },
				]}
			>
				{stage.label}
			</Text>
			<Text style={[styles.count, { color: isActive ? stage.color : colors.text.disabled }]}>
				{count}
			</Text>
		</View>
	);
};
