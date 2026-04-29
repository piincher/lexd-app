// Goods Feature - GoodsCard Component
// Pure presentational component for displaying a single goods item

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Goods } from '../api';
import { StatusBadge } from './StatusBadge';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsImage } from '@src/shared/ui/GoodsImage';
import { normalizePhotos } from '@src/shared/lib';

interface GoodsCardProps {
	goods: Goods;
	onPress?: () => void;
}

const formatCurrency = (amount?: number): string => {
	return `${(amount ?? 0).toLocaleString('fr-FR')} FCFA`;
};

const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + '...';
};

export const GoodsCard: React.FC<GoodsCardProps> = ({ goods, onPress }) => {
	const { colors } = useAppTheme();
	const images = normalizePhotos(goods);

	const styles = useMemo(
		() =>
			StyleSheet.create({
				card: {
					marginHorizontal: 16,
					marginVertical: 8,
					borderRadius: 20,
					overflow: 'hidden',
					elevation: 2,
					shadowColor: colors.text.primary,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.08,
					shadowRadius: 8,
				},
				content: {
					flexDirection: 'row',
					padding: 12,
				},
				imageContainer: {
					marginRight: 12,
					position: 'relative',
				},
				badgeOverlay: {
					position: 'absolute',
					top: 6,
					left: 6,
					zIndex: 1,
				},
				infoContainer: {
					flex: 1,
					justifyContent: 'space-between',
				},
				headerRow: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 4,
				},
				goodsId: {
					fontFamily: Fonts.bold,
					fontWeight: '700',
				},
				description: {
					fontFamily: Fonts.regular,
					color: colors.text.secondary,
					marginBottom: 8,
				},
				footerRow: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				cbmText: {
					fontFamily: Fonts.meduim,
					color: colors.text.disabled,
				},
				costText: {
					fontFamily: Fonts.bold,
					fontSize: 14,
					color: colors.primary.main,
				},
			}),
		[colors]
	);

	return (
		<Pressable onPress={onPress}>
			<Card style={styles.card} mode="elevated">
				<Card.Content style={styles.content}>
					{/* Image Thumbnail */}
					<View style={styles.imageContainer}>
						{goods.status && (
							<View style={styles.badgeOverlay}>
								<StatusBadge status={goods.status} />
							</View>
						)}
						<GoodsImage
							uri={images[0]}
							width={100}
							height={100}
							borderRadius={16}
							placeholderSize="medium"
						/>
					</View>

					{/* Info Section */}
					<View style={styles.infoContainer}>
						<View style={styles.headerRow}>
							<Text style={styles.goodsId} variant="titleSmall">
								{goods.goodsId}
							</Text>
						</View>

						<Text style={styles.description} variant="bodyMedium">
							{truncateText(goods.description, 60)}
						</Text>

						<View style={styles.footerRow}>
							<Text style={styles.cbmText} variant="bodySmall">
								CBM: {(goods.actualCBM || 0).toFixed(3)}
							</Text>
							{goods.totalCost > 0 && (
								<Text style={styles.costText}>
									{formatCurrency(goods.totalCost)}
								</Text>
							)}
						</View>
					</View>
				</Card.Content>
			</Card>
		</Pressable>
	);
};

GoodsCard.displayName = 'GoodsCard';
