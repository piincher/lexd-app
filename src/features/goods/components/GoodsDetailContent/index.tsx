import React from 'react';
import { ScrollView, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { normalizePhotos } from '@src/shared/lib';
import { ReviewPrompt } from '@src/widgets/ReviewPrompt';
import { Goods } from '../../api';
import { GoodsDetailStatusHeader } from '../GoodsDetailStatusHeader';
import { GoodsPhotoSection } from '../GoodsPhotoSection';
import { GoodsDetailStats } from '../GoodsDetailStats';
import { GoodsDetailInfo } from '../GoodsDetailInfo';
import { GoodsDetailTimeline } from '../GoodsDetailTimeline';
import { GoodsDetailPricing } from '../GoodsDetailPricing';
import { GoodsDetailContainer } from '../GoodsDetailContainer';
import { GoodsDetailPickup } from '../GoodsDetailPickup';
import { GoodsDetailQR } from '../GoodsDetailQR';

interface GoodsDetailContentProps {
	goods: Goods;
	onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const SHOW_REVIEW_STATUSES = [
	'PACKED',
	'ASSIGNED_TO_CONTAINER',
	'LOADED_IN_CONTAINER',
	'IN_TRANSIT',
	'ARRIVED_DESTINATION',
	'READY_FOR_PICKUP',
	'DELIVERED',
];

export const GoodsDetailContent: React.FC<GoodsDetailContentProps> = ({ goods, onScroll }) => {
	const images = normalizePhotos(goods);
	const showReview = SHOW_REVIEW_STATUSES.includes(goods.status);

	return (
		<ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={styles.scrollContent}>
			<GoodsDetailStatusHeader
				status={goods.status}
				shippingMode={goods.shippingMode}
				date={goods.receivedAt || goods.createdAt}
			/>
			<GoodsPhotoSection photoUrls={images} />
			<GoodsDetailStats cbm={goods.actualCBM ?? goods.cbm} weight={goods.weight} quantity={goods.quantity} />
			<GoodsDetailInfo goods={goods} />
			<GoodsDetailTimeline
				status={goods.status}
				shippingMode={goods.shippingMode}
				readyForPickupAt={goods.readyForPickupAt}
				deliveredAt={goods.deliveredAt}
			/>
			<GoodsDetailPricing goods={goods} />
			<GoodsDetailContainer goods={goods} />
			<GoodsDetailPickup
				status={goods.status}
				deliveredAt={goods.deliveredAt}
				pickedUpBy={goods.pickedUpBy}
				pickupNotes={goods.pickupNotes}
			/>
			<GoodsDetailQR qrCodeUrl={goods.qrCodeImageUrl || goods.qrCode} />
			{showReview && <ReviewPrompt goodsId={goods._id} goodsLabel={goods.goodsId} />}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 32,
	},
});
