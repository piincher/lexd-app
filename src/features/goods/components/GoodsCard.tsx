// Goods Feature - GoodsCard Component
// Pure presentational component for displaying a single goods item

import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Goods } from '../api';
import { StatusBadge } from './StatusBadge';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
	const images = goods.photos || [];

	const styles = useMemo(
		() =>
			StyleSheet.create({
				card: {
					marginHorizontal: 16,
					marginVertical: 8,
					elevation: 2,
				},
				content: {
					flexDirection: 'row',
					padding: 12,
				},
				imageContainer: {
					marginRight: 12,
				},
				image: {
					width: 80,
					height: 80,
					borderRadius: 8,
				},
				placeholderImage: {
					backgroundColor: colors.background.paper,
					justifyContent: 'center',
					alignItems: 'center',
				},
				placeholderText: {
					fontSize: 32,
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
						{images.length > 0 ? (
							<Image source={{ uri: images[0] }} style={styles.image} />
						) : (
							<View style={[styles.image, styles.placeholderImage]}>
								<Text style={styles.placeholderText}>📦</Text>
							</View>
						)}
					</View>

					{/* Info Section */}
					<View style={styles.infoContainer}>
						<View style={styles.headerRow}>
							<Text style={styles.goodsId} variant="titleSmall">
								{goods.goodsId}
							</Text>
							<StatusBadge status={goods.status} />
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
