import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');

const Banner = () => {
	const { colors } = useAppTheme();
	const [banner, setBanner] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		setBanner([
			'https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/1.jpg',
			'https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/2.jpg',
			'https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/3.jpg',
		]);
		setLoading(false);
		return () => {
			setBanner([]);
		};
	}, []);
	if (loading) {
		return (
			<View style={styles.container}>
				<ShimmerBlock width={width} height={width} borderRadius={0} />
			</View>
		);
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
						paginationStyleItemActive={{ backgroundColor: colors.primary.main }}
						paginationStyleItemInactive={{ backgroundColor: colors.text.secondary }}
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
export default Banner;
