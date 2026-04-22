import React, { useState, useMemo } from 'react';
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
import { useAppTheme } from '@src/providers/ThemeProvider';

const Screen_Width = Dimensions.get('window').width;

interface bannerImageProps {
	bannerImages: {
		public_id: string;
		url: string;
	}[];
}

const Slider = ({ bannerImages }: bannerImageProps) => {
	const [imgActive, setActive] = useState(0);
	const { colors } = useAppTheme();
	const styles = useMemo(() => StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background.default,
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
			color: colors.text.inverse,
		},
		dot: {
			margin: 3,
			color: colors.neutral[200],
		},
	}), [colors]);

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
