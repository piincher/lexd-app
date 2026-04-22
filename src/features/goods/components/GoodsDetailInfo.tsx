import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Goods } from '../api';
import { formatDate } from '../lib/goodsHelpers';

interface GoodsDetailInfoProps {
	goods: Goods;
}

export const GoodsDetailInfo: React.FC<GoodsDetailInfoProps> = ({ goods }) => {
	const { colors } = useAppTheme();

	const hasDimensions = goods.dimensions &&
		(goods.dimensions.length || goods.dimensions.width || goods.dimensions.height);

	return (
		<Card style={styles.card}>
			<View style={styles.header}>
				<MaterialCommunityIcons name="information" size={20} color={colors.primary.main} />
				<Text style={[styles.title, { color: colors.text.primary }]}>Informations</Text>
			</View>
			<Card.Content>
				<Text style={[styles.description, { color: colors.text.primary }]}>
					{goods.description || 'Aucune description'}
				</Text>
				<Divider style={[styles.divider, { backgroundColor: colors.border }]} />

				{goods.expressTrackingNumber && (
					<>
						<View style={styles.infoRow}>
							<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>N° de suivi express</Text>
							<Text style={[styles.infoValue, { color: colors.text.primary, fontFamily: Fonts.bold, letterSpacing: 0.5 }]}>
								{goods.expressTrackingNumber}
							</Text>
						</View>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					</>
				)}

				{hasDimensions && (
					<>
						<View style={styles.infoRow}>
							<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Dimensions (cm)</Text>
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>
								{goods.dimensions!.length ?? '-'} × {goods.dimensions!.width ?? '-'} × {goods.dimensions!.height ?? '-'}
							</Text>
						</View>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					</>
				)}

				<View style={styles.infoRow}>
					<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Emplacement entrepôt</Text>
					<View style={[styles.badge, { backgroundColor: colors.primary.main + '15' }]}>
						<MaterialCommunityIcons name="warehouse" size={14} color={colors.primary.main} />
						<Text style={[styles.badgeText, { color: colors.primary.main }]}>
							{goods.warehouseLocation || 'Non assigné'}
						</Text>
					</View>
				</View>
				<Divider style={[styles.divider, { backgroundColor: colors.border }]} />

				<View style={styles.infoRow}>
					<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Date de réception</Text>
					<Text style={[styles.infoValue, { color: colors.text.primary }]}>
						{formatDate(goods.receivedAt || goods.createdAt)}
					</Text>
				</View>

				{goods.receivedByName && (
					<>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
						<View style={styles.infoRow}>
							<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Reçu par</Text>
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>{goods.receivedByName}</Text>
						</View>
					</>
				)}

				{goods.loadingPosition?.section && (
					<>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
						<View style={styles.infoRow}>
							<Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Position chargement</Text>
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>
								{goods.loadingPosition.section === 'FRONT' ? 'Avant' :
									goods.loadingPosition.section === 'MIDDLE' ? 'Milieu' : 'Arrière'}
								{goods.loadingPosition.sequenceNumber ? ` (#${goods.loadingPosition.sequenceNumber})` : ''}
							</Text>
						</View>
					</>
				)}
			</Card.Content>
		</Card>
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
	description: {
		fontFamily: Fonts.regular,
		fontSize: 14,
		lineHeight: 20,
		paddingVertical: 8,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	infoLabel: {
		fontFamily: Fonts.medium,
		fontSize: 13,
	},
	infoValue: {
		fontFamily: Fonts.bold,
		fontSize: 13,
		flex: 1,
		textAlign: 'right',
	},
	divider: {
		marginVertical: 0,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		gap: 4,
	},
	badgeText: {
		fontFamily: Fonts.bold,
		fontSize: 13,
	},
});
