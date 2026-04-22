import React from 'react';
import { Card } from 'react-native-paper';
import { PhotoGallery } from '@src/shared/ui/PhotoGallery';

interface GoodsPhotoSectionProps {
	photoUrls?: string[];
}

export const GoodsPhotoSection: React.FC<GoodsPhotoSectionProps> = ({ photoUrls }) => {
	return (
		<Card style={{ marginHorizontal: 16, marginBottom: 12, elevation: 2, borderRadius: 12, overflow: 'hidden' }}>
			<PhotoGallery photoUrls={photoUrls} imageHeight={220} showCounter emptyLabel="Aucune photo" />
		</Card>
	);
};
