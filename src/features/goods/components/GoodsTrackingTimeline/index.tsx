// Goods Feature - GoodsTrackingTimeline Component
// Pure presentational component for displaying goods tracking timeline

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './styles';

export interface TrackingEvent {
	status: string;
	location: string;
	timestamp: string;
	description?: string;
}

interface GoodsTrackingTimelineProps {
	events: TrackingEvent[];
	currentStatus: string;
}

const formatDate = (timestamp: string): string => {
	const date = new Date(timestamp);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	});
};

export const GoodsTrackingTimeline: React.FC<GoodsTrackingTimelineProps> = ({
	events,
	currentStatus,
}) => {
	const { colors } = useAppTheme();

	const STATUS_CONFIG: Record<string, { icon: string; color: string; bgColor: string }> = {
		RECEIVED_AT_WAREHOUSE: { icon: '📦', color: colors.status.info, bgColor: colors.feedback.infoBg },
		PACKED: { icon: '📦', color: colors.primary.main, bgColor: colors.primary[50] },
		ASSIGNED_TO_CONTAINER: { icon: '📋', color: colors.status.warning, bgColor: colors.feedback.warningBg },
		LOADED_IN_CONTAINER: { icon: '🚢', color: colors.status.error, bgColor: colors.feedback.errorBg },
		IN_TRANSIT: { icon: '✈️', color: colors.status.info, bgColor: colors.feedback.infoBg },
		ARRIVED_DESTINATION: { icon: '🏁', color: colors.status.success, bgColor: colors.feedback.successBg },
		READY_FOR_PICKUP: { icon: '📍', color: colors.primary.main, bgColor: colors.primary[50] },
		DELIVERED: { icon: '✅', color: colors.neutral[600], bgColor: colors.neutral[100] },
	};

	const sortedEvents = [...events].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);

	return (
		<View style={styles.container}>
			{sortedEvents.map((event, index) => {
				const config = STATUS_CONFIG[event.status] || {
					icon: '📍',
					color: colors.neutral[400],
					bgColor: colors.neutral[100],
				};
				const isCurrent = event.status === currentStatus;
				const isLast = index === sortedEvents.length - 1;

				return (
					<View key={index} style={styles.eventRow}>
						<View style={styles.leftColumn}>
							<View
								style={[
									styles.iconContainer,
									{ backgroundColor: config.bgColor },
									isCurrent && styles.currentIconContainer,
								]}
							>
								<Text style={styles.icon}>{config.icon}</Text>
							</View>
							{!isLast && <View style={styles.connector} />}
						</View>

						<View style={styles.contentColumn}>
							<View style={styles.headerRow}>
								<Text
									style={[
										styles.statusText,
										{ color: config.color },
										isCurrent && styles.currentStatusText,
									]}
								>
									{event.status.replace(/_/g, ' ')}
								</Text>
								<Text style={styles.timestamp}>{formatDate(event.timestamp)}</Text>
							</View>
							<Text style={styles.location}>📍 {event.location}</Text>
							{event.description && (
								<Text style={styles.description}>{event.description}</Text>
							)}
							{isCurrent && <View style={styles.currentIndicator} />}
						</View>
					</View>
				);
			})}
		</View>
	);
};

GoodsTrackingTimeline.displayName = 'GoodsTrackingTimeline';
