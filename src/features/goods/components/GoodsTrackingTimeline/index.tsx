// Goods Feature - GoodsTrackingTimeline Component
// Pure presentational component for displaying goods tracking timeline

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
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

const STATUS_CONFIG: Record<string, { icon: string; color: string; bgColor: string }> = {
	RECEIVED_AT_WAREHOUSE: { icon: '📦', color: Theme.status.info, bgColor: Theme.feedback.infoBg },
	ASSIGNED_TO_CONTAINER: { icon: '📋', color: Theme.status.warning, bgColor: Theme.feedback.warningBg },
	LOADED_IN_CONTAINER: { icon: '🚢', color: '#9C27B0', bgColor: '#F3E5F5' },
	IN_TRANSIT: { icon: '✈️', color: '#3F51B5', bgColor: '#E8EAF6' },
	ARRIVED_DESTINATION: { icon: '🏁', color: Theme.status.success, bgColor: Theme.feedback.successBg },
	READY_FOR_PICKUP: { icon: '📍', color: Theme.primary.main, bgColor: Theme.primary[50] },
	DELIVERED: { icon: '✅', color: Theme.neutral[600], bgColor: Theme.neutral[100] },
};

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
	const sortedEvents = [...events].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);

	return (
		<View style={styles.container}>
			{sortedEvents.map((event, index) => {
				const config = STATUS_CONFIG[event.status] || {
					icon: '📍',
					color: Theme.neutral[400],
					bgColor: Theme.neutral[100],
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
