// Goods Feature - MyGoodsScreen
// Main screen that composes components and handles navigation
// No business logic - only composition and navigation

import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, ActivityIndicator, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetMyGoods } from '../hooks';
import { GoodsList } from '../components';
import { GoodsFilter } from '../components';
import { GoodsListSkeleton } from '../components/GoodsListSkeleton';
import { GoodsStatus } from '../api';

type FilterTab = 'ALL' | GoodsStatus;

const MyGoodsScreen = ({ navigation }: RootStackScreenProps<'MyGoods'>) => {
	const { colors } = useAppTheme();
	const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');

	const filters = activeFilter === 'ALL' ? undefined : { status: activeFilter };
	const { data, isLoading, isError, error, refetch, isFetching } = useGetMyGoods(filters);

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flex: 1,
					backgroundColor: colors.background.default,
				},
				headerTitle: {
					fontFamily: Fonts.bold,
				},
				centerContainer: {
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					paddingHorizontal: 32,
				},
				errorTitle: {
					fontSize: 18,
					fontFamily: Fonts.bold,
					color: colors.text.primary,
					marginTop: 16,
				},
				errorText: {
					fontSize: 14,
					fontFamily: Fonts.regular,
					color: colors.text.secondary,
					textAlign: 'center',
					marginTop: 8,
				},
				retryButton: {
					marginTop: 24,
				},
			}),
		[colors]
	);

	const handleRefresh = () => { refetch(); };
	const handleGoodsPress = (goodsId: string) => { navigation.navigate('GoodsDetail', { goodsId }); };
	const handleScanPress = () => { navigation.navigate('ScanQR'); };
	const handleFilterChange = (filter: FilterTab) => { setActiveFilter(filter); };

	const goods = data?.goods || [];

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<Appbar.Header>
					<Appbar.Content title="Mes Marchandises" titleStyle={styles.headerTitle} />
					<Appbar.Action icon="qrcode-scan" onPress={handleScanPress} />
				</Appbar.Header>
				<GoodsListSkeleton />
			</SafeAreaView>
		);
	}

	if (isError) {
		return (
			<SafeAreaView style={styles.container}>
				<Appbar.Header>
					<Appbar.Content title="Mes Marchandises" />
					<Appbar.Action icon="qrcode-scan" onPress={handleScanPress} />
				</Appbar.Header>
				<View style={styles.centerContainer}>
					<MaterialCommunityIcons name="alert-circle" size={64} color={colors.status.error} />
					<Text style={styles.errorTitle}>Erreur de chargement</Text>
					<Text style={styles.errorText}>
						{error?.message || 'Une erreur est survenue lors du chargement de vos marchandises.'}
					</Text>
					<Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
						Réessayer
					</Button>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Mes Marchandises" titleStyle={styles.headerTitle} />
				<Appbar.Action icon="qrcode-scan" onPress={handleScanPress} />
			</Appbar.Header>

			<GoodsFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />

			<GoodsList
				goods={goods}
				refreshing={isFetching}
				onRefresh={handleRefresh}
				onGoodsPress={handleGoodsPress}
			/>
		</SafeAreaView>
	);
};

export default MyGoodsScreen;
