import React, { useState } from 'react';
import {
	Image,
	StyleSheet,
	View,
	ScrollView,
	Text,
	NativeScrollEvent,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@src/constants/Colors';

const Screen_Width = Dimensions.get('window').width;

interface bannerImageProps {
	bannerImages: {
		public_id: string;
		url: string;
	}[];
}

const Slider = ({ bannerImages }: bannerImageProps) => {
	const [imgActive, setActive] = useState(0);
	const onChange = (nativeEvent: NativeScrollEvent) => {
		if (nativeEvent) {
			const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
			if (slide != imgActive) {
				setActive(slide);
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<>
				<ScrollView
					onScroll={({ nativeEvent }) => onChange(nativeEvent)}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					horizontal
				>
					{bannerImages.map((e) => {
						return <Image source={{ uri: e.url }} resizeMode='stretch' style={styles.wrap} key={e.public_id} />;
					})}
				</ScrollView>
			</>
			<View style={styles.wrapDot}>
				{bannerImages.map((e, index) => {
					return (
						<Text key={e.public_id} style={imgActive == index ? styles.dotActive : styles.dot}>
							&#x25cf;
						</Text>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default Slider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	wrap: {
		width: Screen_Width - 32,
		height: Screen_Width,
		marginHorizontal: 16,
	},
	wrapDot: {
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	dotActive: {
		margin: 3,
		color: COLORS.white,
	},
	dot: {
		margin: 3,
		color: '#E8EFF5',
	},
});
