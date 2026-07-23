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

// Stages walk down the green ramp so the strip reads as progress deepening
// toward delivery, instead of the previous unrelated blue/mint/orange mix.
// Transit is the one amber node: it is the state in motion, and giving this
// view a single focal point is the accent's job.
const getStages = (colors: any) => [
	{ key: 'received', label: 'Reçu', icon: 'archive-outline', color: colors.primary[300] },
	{ key: 'inContainer', label: 'Chargé', icon: 'cube-outline', color: colors.primary[400] },
	{ key: 'inTransit', label: 'Transit', icon: 'airplane-outline', color: colors.accent.amber },
	{ key: 'arrived', label: 'Arrivé', icon: 'flag-outline', color: colors.primary[500] },
	{ key: 'ready', label: 'Prêt', icon: 'checkmark-circle-outline', color: colors.primary[600] },
	{ key: 'delivered', label: 'Livré', icon: 'home-outline', color: colors.primary[700] },
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
