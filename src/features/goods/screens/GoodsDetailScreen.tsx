import React from 'react';
import { ScrollView, Share } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/store/Auth';
import { EmptyState } from '@src/shared/ui';
import { Fonts } from '@src/constants/Fonts';
import { useGetGoodsDetail } from '../hooks';
import { useCreateShareToken } from '@src/features/public/hooks/useCreateShareToken';
import { ReviewPrompt } from '@src/features/customer/reviews';
import { GoodsDetailSkeleton } from '../components/GoodsDetailSkeleton';
import { GoodsDetailStatusHeader } from '../components/GoodsDetailStatusHeader';
import { GoodsPhotoSection } from '../components/GoodsPhotoSection';
import { GoodsDetailStats } from '../components/GoodsDetailStats';
import { GoodsDetailInfo } from '../components/GoodsDetailInfo';
import { GoodsDetailTimeline } from '../components/GoodsDetailTimeline';
import { GoodsDetailPricing } from '../components/GoodsDetailPricing';
import { GoodsDetailContainer } from '../components/GoodsDetailContainer';
import { GoodsDetailPickup } from '../components/GoodsDetailPickup';
import { GoodsDetailQR } from '../components/GoodsDetailQR';

const GoodsDetailScreen = ({ navigation, route }: RootStackScreenProps<'GoodsDetail'>) => {
	const { goodsId } = route.params;
	const { colors } = useAppTheme();
	const isAdmin = useAuth((state) => state.user?.role) === 'admin';
	const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);
	const { mutateAsync: createShareToken } = useCreateShareToken();

	if (isLoading) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Détails" />
				</Appbar.Header>
				<GoodsDetailSkeleton />
			</SafeAreaView>
		);
	}

	if (isError || !goods) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Détails" />
				</Appbar.Header>
				<EmptyState
					icon="alert-circle"
					iconColor={colors.status.error}
					title="Erreur de chargement"
					message={error?.message || 'Impossible de charger les détails de cette marchandise.'}
					actionLabel="Réessayer"
					onAction={() => refetch()}
				/>
			</SafeAreaView>
		);
	}

	const images = goods.photos?.length ? goods.photos : goods.images;
	const showReview = ['PACKED', 'ASSIGNED_TO_CONTAINER', 'LOADED_IN_CONTAINER', 'IN_TRANSIT', 'ARRIVED_DESTINATION', 'READY_FOR_PICKUP', 'DELIVERED'].includes(goods.status);

	const handleShare = async () => {
		try {
			const result = await createShareToken({ type: 'goods', resourceReference: goods.goodsId });
			await Share.share({ message: `Suivez ma marchandise ChinaLink Express: ${goods.goodsId}\n${result.url}`, title: `Marchandise ${goods.goodsId}` });
		} catch {
			try {
				await Share.share({ message: `Marchandise ${goods.goodsId} - ${goods.description}\nStatut: ${goods.status}`, title: `Détails Marchandise ${goods.goodsId}` });
			} catch (err) {
				console.error('Error sharing:', err);
			}
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={goods.goodsId} titleStyle={{ fontFamily: Fonts.bold }} />
				{isAdmin && <Appbar.Action icon="pencil" onPress={() => navigation.navigate('EditGoods', { goodsId })} />}
				<Appbar.Action icon="share-variant" onPress={handleShare} />
			</Appbar.Header>
			<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
				<GoodsDetailStatusHeader status={goods.status} shippingMode={goods.shippingMode} date={goods.receivedAt || goods.createdAt} />
				<GoodsPhotoSection photoUrls={images} />
				<GoodsDetailStats cbm={goods.actualCBM ?? goods.cbm} weight={goods.weight} quantity={goods.quantity} />
				<GoodsDetailInfo goods={goods} />
				<GoodsDetailTimeline status={goods.status} shippingMode={goods.shippingMode} readyForPickupAt={goods.readyForPickupAt} deliveredAt={goods.deliveredAt} />
				<GoodsDetailPricing goods={goods} />
				<GoodsDetailContainer goods={goods} />
				<GoodsDetailPickup status={goods.status} deliveredAt={goods.deliveredAt} pickedUpBy={goods.pickedUpBy} pickupNotes={goods.pickupNotes} />
				<GoodsDetailQR qrCodeUrl={goods.qrCodeImageUrl || goods.qrCode} />
				{showReview && <ReviewPrompt goodsId={goods._id} goodsLabel={goods.goodsId} />}
			</ScrollView>
		</SafeAreaView>
	);
};

export default GoodsDetailScreen;
