import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { GoodsStatus } from '../api';
import { formatDateTime } from '../lib/goodsHelpers';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

interface GoodsDetailPickupProps {
	status: GoodsStatus;
	deliveredAt?: string;
	pickedUpBy?: string;
	pickupNotes?: string;
}

export const GoodsDetailPickup: React.FC<GoodsDetailPickupProps> = ({
	status,
	deliveredAt,
	pickedUpBy,
	pickupNotes,
}) => {
	const { colors } = useAppTheme();
	if (status !== 'READY_FOR_PICKUP' && status !== 'DELIVERED') return null;

	return (
		<Card style={[styles.card, { borderColor: colors.border }]}>
			<View style={styles.header}>
				<MaterialCommunityIcons name={status === 'DELIVERED' ? 'check-circle' : 'package-variant'} size={20} color={status === 'DELIVERED' ? colors.status.success : colors.status.warning} />
				<Text style={[styles.title, { color: colors.text.primary }]}>Statut de Retrait</Text>
			</View>
			<Card.Content>
				{status === 'READY_FOR_PICKUP' && (
					<>
						<View style={[styles.banner, { backgroundColor: colors.status.warning + '30' }]}>
							<MaterialCommunityIcons name="package-variant" size={20} color={colors.status.warning} />
							<Text style={[styles.bannerText, { color: colors.text.primary }]}>Prêt pour Retrait</Text>
						</View>
						<View style={[styles.location, { backgroundColor: colors.background.paper }]}>
							<MaterialCommunityIcons name="warehouse" size={20} color={colors.text.secondary} />
							<View style={{ marginLeft: 12, flex: 1 }}>
								<Text style={[styles.locationTitle, { color: colors.text.primary }]}>Lieu de Retrait</Text>
								<Text style={[styles.locationAddress, { color: colors.text.secondary }]}>Entrepôt Bamako - Zone Industrielle</Text>
							</View>
						</View>
						<View style={[styles.message, { backgroundColor: colors.primary.main + '12' }]}>
							<MaterialCommunityIcons name="information" size={18} color={colors.primary.main} />
							<Text style={[styles.messageText, { color: colors.primary.main }]}>Contactez-nous pour organiser le retrait de votre marchandise</Text>
						</View>
					</>
				)}
				{status === 'DELIVERED' && (
					<>
						<View style={[styles.banner, { backgroundColor: colors.status.success + '30' }]}>
							<MaterialCommunityIcons name="check-circle" size={20} color={colors.status.success} />
							<Text style={[styles.bannerText, { color: colors.text.primary }]}>Livré avec succès</Text>
						</View>
						{deliveredAt && (
							<View style={styles.row}>
								<Text style={[styles.label, { color: colors.text.secondary }]}>Date de livraison</Text>
								<Text style={[styles.value, { color: colors.text.primary }]}>{formatDateTime(deliveredAt)}</Text>
							</View>
						)}
						{pickedUpBy && (
							<>
								<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
								<View style={styles.row}>
									<Text style={[styles.label, { color: colors.text.secondary }]}>Retiré par</Text>
									<Text style={[styles.value, { color: colors.text.primary }]}>{pickedUpBy}</Text>
								</View>
							</>
						)}
						{pickupNotes && (
							<>
								<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
								<View style={styles.row}>
									<Text style={[styles.label, { color: colors.text.secondary }]}>Notes</Text>
									<Text style={[styles.value, { color: colors.text.primary }]}>{pickupNotes}</Text>
								</View>
							</>
						)}
					</>
				)}
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: { marginHorizontal: 16, marginBottom: 12, borderRadius: RADIUS.card, borderWidth: HAIRLINE },
	header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 8 },
	title: { fontFamily: Fonts.bold, fontSize: 15 },
	banner: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginBottom: 16, gap: 8 },
	bannerText: { fontFamily: Fonts.bold, fontSize: 13 },
	location: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 12, marginBottom: 12 },
	locationTitle: { fontFamily: Fonts.bold, fontSize: 14, marginBottom: 2 },
	locationAddress: { fontFamily: Fonts.regular, fontSize: 13 },
	message: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, borderRadius: 8, gap: 8 },
	messageText: { fontFamily: Fonts.medium, fontSize: 13, flex: 1 },
	row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
	label: { fontFamily: Fonts.medium, fontSize: 13 },
	value: { fontFamily: Fonts.bold, fontSize: 13, flex: 1, textAlign: 'right' },
	divider: { marginVertical: 0 },
});
