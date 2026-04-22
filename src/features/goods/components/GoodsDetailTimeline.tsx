import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { GoodsStatus } from '../api';
import { formatDateTime, getStatusSteps, getStatusIndex } from '../lib/goodsHelpers';

interface GoodsDetailTimelineProps {
	status: GoodsStatus;
	shippingMode?: string;
	readyForPickupAt?: string;
	deliveredAt?: string;
}

export const GoodsDetailTimeline: React.FC<GoodsDetailTimelineProps> = ({
	status,
	shippingMode,
	readyForPickupAt,
	deliveredAt,
}) => {
	const { colors } = useAppTheme();
	const mode = (shippingMode || 'SEA') as 'AIR' | 'SEA';
	const steps = getStatusSteps(mode);
	const currentIndex = getStatusIndex(status, mode);

	return (
		<Card style={styles.card}>
			<View style={styles.header}>
				<MaterialCommunityIcons name="timeline-clock" size={20} color={colors.primary.main} />
				<Text style={[styles.title, { color: colors.text.primary }]}>Suivi du statut</Text>
			</View>
			<Card.Content>
				<View style={styles.timeline}>
					{steps.map((step, index) => {
						const isCompleted = index <= currentIndex;
						const isCurrent = index === currentIndex;
						return (
							<View key={step.key} style={styles.step}>
								{index > 0 && (
									<View style={[styles.connector, { backgroundColor: isCompleted ? colors.status.success : colors.border }]} />
								)}
								<View style={[styles.circle, {
									backgroundColor: isCompleted ? colors.status.success : colors.background.paper,
									borderColor: isCurrent ? colors.status.warning : 'transparent',
									borderWidth: isCurrent ? 2 : 0,
								}]}>
									<MaterialCommunityIcons name={step.icon as any} size={16} color={isCompleted ? colors.text.inverse : colors.text.disabled} />
								</View>
								<Text style={[styles.label, {
									color: isCompleted ? colors.text.primary : colors.text.disabled,
									fontFamily: isCurrent ? Fonts.bold : Fonts.regular,
								}]}>{step.label}</Text>
							</View>
						);
					})}
				</View>
				<View style={styles.keyDates}>
					{readyForPickupAt && (
						<View style={styles.keyDateRow}>
							<MaterialCommunityIcons name="calendar-check" size={14} color={colors.text.secondary} />
							<Text style={[styles.keyDateText, { color: colors.text.secondary }]}>Prêt le {formatDateTime(readyForPickupAt)}</Text>
						</View>
					)}
					{deliveredAt && (
						<View style={styles.keyDateRow}>
							<MaterialCommunityIcons name="calendar-check" size={14} color={colors.status.success} />
							<Text style={[styles.keyDateText, { color: colors.text.secondary }]}>Livré le {formatDateTime(deliveredAt)}</Text>
						</View>
					)}
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: { marginHorizontal: 16, marginBottom: 12, elevation: 2, borderRadius: 12 },
	header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 8 },
	title: { fontFamily: Fonts.bold, fontSize: 15 },
	timeline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 8, paddingHorizontal: 4 },
	step: { alignItems: 'center', flex: 1, position: 'relative' },
	connector: { position: 'absolute', top: 16, left: -20, right: 20, height: 2, zIndex: -1 },
	circle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
	label: { fontSize: 9, textAlign: 'center' },
	keyDates: { marginTop: 8, gap: 6 },
	keyDateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
	keyDateText: { fontFamily: Fonts.regular, fontSize: 12 },
});
