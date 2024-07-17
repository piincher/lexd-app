import { COLORS } from '@src/constants/Colors';
import React, { useEffect, useState, memo } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');

const Banner = () => {
	const [banner, setBanner] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		setBanner([
			'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/1.jpg',
			'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/2.jpg',
			'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/3.jpg',
		]);
		setLoading(false);
		return () => {
			setBanner([]);
		};
	}, []);
	if (loading) {
		return <ActivityIndicator size='large' color={COLORS.blue} />;
	}

	return (
		<>
			<View>
				<View style={styles.swiper}>
					<SwiperFlatList
						autoplay
						autoplayDelay={3}
						autoplayLoop
						index={2}
						showPagination
						paginationStyleItemActive={{ backgroundColor: COLORS.blue }}
						paginationStyleItemInactive={{ backgroundColor: COLORS.grey }}
					>
						{banner.map((item) => {
							return (
								<React.Fragment key={item}>
									<Image key={item} source={{ uri: item }} resizeMode='cover' style={styles.imageContainer} />
								</React.Fragment>
							);
						})}
					</SwiperFlatList>
					<View style={{ height: 50 }} />
				</View>
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	swiper: {
		width,
		alignItems: 'center',
	},
	imageContainer: {
		height: width,
		width: width,
	},
});
export default memo(Banner);
