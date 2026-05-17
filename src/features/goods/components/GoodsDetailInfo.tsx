import React from 'react';
import { View } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Goods } from '../api';
import { formatDate } from '../lib/goodsHelpers';
import { GoodsDetailInfoRow } from './GoodsDetailInfoRow';
import { GoodsDetailInfoBadge } from './GoodsDetailInfoBadge';
import { styles } from './GoodsDetailInfo.styles';

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
						<GoodsDetailInfoRow label="N° de suivi express">
							<Text style={[styles.infoValue, { color: colors.text.primary, fontFamily: Fonts.bold, letterSpacing: 0.5 }]}>
								{goods.expressTrackingNumber}
							</Text>
						</GoodsDetailInfoRow>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					</>
				)}

				{hasDimensions && (
					<>
						<GoodsDetailInfoRow label="Dimensions (cm)">
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>
								{goods.dimensions!.length ?? '-'} × {goods.dimensions!.width ?? '-'} × {goods.dimensions!.height ?? '-'}
							</Text>
						</GoodsDetailInfoRow>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					</>
				)}

				<GoodsDetailInfoRow label="Emplacement entrepôt">
					<GoodsDetailInfoBadge icon="warehouse" text={goods.warehouseLocation || 'Non assigné'} />
				</GoodsDetailInfoRow>
				<Divider style={[styles.divider, { backgroundColor: colors.border }]} />

				<GoodsDetailInfoRow label="Date de réception">
					<Text style={[styles.infoValue, { color: colors.text.primary }]}>
						{formatDate(goods.receivedAt || goods.createdAt)}
					</Text>
				</GoodsDetailInfoRow>

				{goods.receivedByName && (
					<>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
						<GoodsDetailInfoRow label="Reçu par">
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>{goods.receivedByName}</Text>
						</GoodsDetailInfoRow>
					</>
				)}

				{goods.loadingPosition?.section && (
					<>
						<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
						<GoodsDetailInfoRow label="Position chargement">
							<Text style={[styles.infoValue, { color: colors.text.primary }]}>
								{goods.loadingPosition.section === 'FRONT' ? 'Avant' :
									goods.loadingPosition.section === 'MIDDLE' ? 'Milieu' : 'Arrière'}
								{goods.loadingPosition.sequenceNumber ? ` (#${goods.loadingPosition.sequenceNumber})` : ''}
							</Text>
						</GoodsDetailInfoRow>
					</>
				)}
			</Card.Content>
		</Card>
	);
};
