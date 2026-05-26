import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { JourneyStep } from './JourneyStep';
import { JourneyConnector } from './JourneyConnector';
import { JourneyEmptyState } from './JourneyEmptyState';
import { createJourneyMapStyles } from './JourneyMap.styles';

interface Props {
	goodsByStatus: Record<string, number>;
	totalGoods: number;
}

const getStages = (colors: any) => [
	{ key: 'received', label: 'Reçu', icon: 'archive-outline', color: colors.status.info },
	{ key: 'inContainer', label: 'Chargé', icon: 'cube-outline', color: colors.accent.mint },
	{ key: 'inTransit', label: 'Transit', icon: 'airplane-outline', color: colors.status.warning },
	{ key: 'arrived', label: 'Arrivé', icon: 'flag-outline', color: colors.status.success },
	{ key: 'ready', label: 'Prêt', icon: 'checkmark-circle-outline', color: colors.primary.main },
	{ key: 'delivered', label: 'Livré', icon: 'home-outline', color: colors.primary.dark },
];

export const JourneyMap: React.FC<Props> = ({ goodsByStatus, totalGoods }) => {
	const { colors } = useAppTheme();
	const styles = createJourneyMapStyles(colors);
	const STAGES = getStages(colors);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Parcours d'Expédition</Text>
				<View style={styles.totalBadge}>
					<Text style={styles.totalText}>{totalGoods} total</Text>
				</View>
			</View>

			{totalGoods === 0 ? (
				<JourneyEmptyState />
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
					<View style={styles.track}>
						{STAGES.map((stage, index) => {
							const count = goodsByStatus[stage.key] || 0;
							const isActive = count > 0;
							const isLast = index === STAGES.length - 1;

							return (
								<React.Fragment key={stage.key}>
									<JourneyStep stage={stage} count={count} />
									{!isLast && <JourneyConnector isActive={isActive} color={stage.color} />}
								</React.Fragment>
							);
						})}
					</View>
				</ScrollView>
			)}
		</View>
	);
};

export default JourneyMap;
