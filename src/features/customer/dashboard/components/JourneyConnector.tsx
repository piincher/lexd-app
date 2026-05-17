import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createJourneyMapStyles } from './JourneyMap.styles';

interface JourneyConnectorProps {
	isActive: boolean;
	color: string;
}

export const JourneyConnector: React.FC<JourneyConnectorProps> = ({ isActive, color }) => {
	const { colors } = useAppTheme();
	const styles = createJourneyMapStyles(colors);

	return (
		<View
			style={[
				styles.line,
				{ backgroundColor: isActive ? color : colors.neutral[200] },
			]}
		/>
	);
};
