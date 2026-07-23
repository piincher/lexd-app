import React from 'react';
import { Card } from 'react-native-paper';
import { PhotoGallery } from '@src/shared/ui/PhotoGallery';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

interface GoodsPhotoSectionProps {
	photoUrls?: string[];
}

export const GoodsPhotoSection: React.FC<GoodsPhotoSectionProps> = ({ photoUrls }) => {
	const { colors } = useAppTheme();

	return (
		<Card style={{ marginHorizontal: 16, marginBottom: 12, borderRadius: RADIUS.card, borderWidth: HAIRLINE, borderColor: colors.border, overflow: 'hidden' }}>
			<PhotoGallery photoUrls={photoUrls} imageHeight={220} showCounter emptyLabel="Aucune photo" />
		</Card>
	);
};
