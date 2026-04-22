import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Goods } from '../api';

interface GoodsDetailContainerProps {
	goods: Goods;
}

export const GoodsDetailContainer: React.FC<GoodsDetailContainerProps> = ({ goods }) => {
	const { colors } = useAppTheme();
	const navigation = useNavigation<any>();

	const handleNavigateToContainer = () => {
		if (goods.containerId?._id) {
			navigation.navigate('ContainerTracking', { containerId: goods.containerId._id });
		}
	};

	const handleNavigateToAirwayBill = () => {
		if (goods.airwayBillId?._id) {
			navigation.navigate('AirwayBillTracking', { airwayBillId: goods.airwayBillId._id });
		}
	};

	if (!goods.containerId && !goods.airwayBillId) return null;

	return (
		<>
			{goods.containerId && (
				<Card style={styles.card}>
					<View style={styles.header}>
						<MaterialCommunityIcons name="cube" size={20} color={colors.primary.main} />
						<Text style={[styles.title, { color: colors.text.primary }]}>Container</Text>
					</View>
					<Card.Content>
						<Pressable onPress={handleNavigateToContainer}>
							<View style={[styles.box, { backgroundColor: colors.background.paper }]}>
								<MaterialCommunityIcons name="ferry" size={36} color={colors.primary.main} />
								<View style={styles.boxInfo}>
									<Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
										Votre marchandise est dans le container:
									</Text>
									<Text style={[styles.boxNumber, { color: colors.text.primary }]}>
										{typeof goods.containerId === 'object'
											? goods.containerId.virtualContainerNumber
											: goods.containerId}
									</Text>
								</View>
								<MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
							</View>
						</Pressable>
						<Button
							mode="contained"
							onPress={handleNavigateToContainer}
							style={styles.trackButton}
							icon="map-marker-path"
						>
							Suivre le Container
						</Button>
					</Card.Content>
				</Card>
			)}

			{goods.airwayBillId && (
				<Card style={styles.card}>
					<View style={styles.header}>
						<MaterialCommunityIcons name="airplane" size={20} color={colors.primary.main} />
						<Text style={[styles.title, { color: colors.text.primary }]}>Lettre de transport aérienne</Text>
					</View>
					<Card.Content>
						<Pressable onPress={handleNavigateToAirwayBill}>
							<View style={[styles.box, { backgroundColor: colors.background.paper }]}>
								<MaterialCommunityIcons name="airplane" size={36} color={colors.primary.main} />
								<View style={styles.boxInfo}>
									<Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
										Votre colis est sous l'AWB:
									</Text>
									<Text style={[styles.boxNumber, { color: colors.text.primary }]}>
										{typeof goods.airwayBillId === 'object'
											? goods.airwayBillId.awbNumber
											: goods.airwayBillId}
									</Text>
									{typeof goods.airwayBillId === 'object' && (
										<Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
											{goods.airwayBillId.airline} · {goods.airwayBillId.flightNumber}
										</Text>
									)}
								</View>
								<MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
							</View>
						</Pressable>
						<Button
							mode="contained"
							onPress={handleNavigateToAirwayBill}
							style={styles.trackButton}
							icon="airplane"
						>
							Suivre le vol
						</Button>
					</Card.Content>
				</Card>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 16,
		marginBottom: 12,
		elevation: 2,
		borderRadius: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		gap: 8,
	},
	title: {
		fontFamily: Fonts.bold,
		fontSize: 15,
	},
	box: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	boxInfo: {
		marginLeft: 12,
		flex: 1,
	},
	boxLabel: {
		fontFamily: Fonts.regular,
		fontSize: 12,
		marginBottom: 4,
	},
	boxNumber: {
		fontFamily: Fonts.bold,
		fontSize: 16,
	},
	trackButton: {
		borderRadius: 8,
	},
});
