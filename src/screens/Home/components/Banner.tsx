import { COLORS } from '@src/constants/Colors';
import React, { useEffect, useState, memo } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const { width } = Dimensions.get('window');

const Banner = () => {
	const [banner, setBanner] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		setBanner([
			'https://hs-cargoexpress.nyc3.cdn.digitaloceanspaces.com/seashipping/fl2.jpeg',
			'https://hs-cargoexpress.nyc3.cdn.digitaloceanspaces.com/seashipping/fl1.jpeg',
		]);
		setLoading(false);
		return () => {
			setBanner([]);
		};
	}, []);
	if (loading) {
		return <ActivityIndicator size='large' color={COLORS.primary} />;
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<View style={styles.swiper}>
					<SwiperFlatList
						autoplay
						autoplayDelay={5}
						autoplayLoop
						index={0}
						showPagination
						paginationStyleItemActive={{ backgroundColor: COLORS.primary, marginTop: 10 }}
						paginationStyleItemInactive={{ backgroundColor: COLORS.grey, marginTop: 10 }}
					>
						{banner.map((item) => {
							return (
								<React.Fragment key={item}>
									<Image key={item} source={{ uri: item }} style={styles.imageContainer} />
								</React.Fragment>
							);
						})}
					</SwiperFlatList>
					<View style={{ height: 20 }} />
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		//backgroundColor: "gainsboro",
		alignItems: 'center',
		justifyContent: 'center',
	},
	swiper: {
		width,
		alignItems: 'center',
		marginTop: 20,
	},
	imageContainer: {
		height: width,
		width: width - 40,
		borderRadius: 10,
		marginHorizontal: 20,
	},
});
export default memo(Banner);
