import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/store/Auth';
import { useHideTabBarOnScroll } from '@src/shared/lib';
import { useGetGoodsDetail } from '../hooks';
import {
	GoodsDetailLoading,
	GoodsDetailError,
	GoodsDetailHeader,
	GoodsDetailContent,
} from '../components';

const GoodsDetailScreen = ({ navigation, route }: RootStackScreenProps<'GoodsDetail'>) => {
	const { goodsId } = route.params;
	const { colors } = useAppTheme();
	const { onScroll } = useHideTabBarOnScroll();
	const isAdmin = useAuth((state) => state.user?.role) === 'admin';
	const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);

	if (isLoading) {
		return <GoodsDetailLoading onBack={() => navigation.goBack()} />;
	}

	if (isError || !goods) {
		return (
			<GoodsDetailError
				error={error}
				onRetry={refetch}
				onBack={() => navigation.goBack()}
			/>
		);
	}

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
			<GoodsDetailHeader
				goods={goods}
				isAdmin={isAdmin}
				onBack={() => navigation.goBack()}
				onEdit={() => navigation.navigate('EditGoods', { goodsId })}
			/>
			<GoodsDetailContent goods={goods} onScroll={onScroll} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default GoodsDetailScreen;
