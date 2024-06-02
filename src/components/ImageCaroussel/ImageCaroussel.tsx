import React, { useState, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View, Animated } from 'react-native';

//import components
import ImgSliderItem from '../ImageSlider/ImageSlider';
import { COLORS } from '@src/constants/Colors';

const { width, height } = Dimensions.get('window');

interface Props {
	images: { public_id: string; url: string }[];
	onPress?: () => void;
}

const CardView = ({ images, onPress }: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;

	const updateIndex = (e: any) => {
		const contentOffset = e.nativeEvent.contentOffset;
		const viewSize = e.nativeEvent.layoutMeasurement;
		const newIndex = Math.floor(contentOffset.x / viewSize.width);
		setActiveIndex(newIndex);
	};

	return (
		<View style={styles.container}>
			<Animated.FlatList
				data={images}
				keyExtractor={(item) => item.public_id}
				horizontal
				pagingEnabled
				scrollEnabled
				snapToAlignment='center'
				scrollEventThrottle={16}
				decelerationRate={'fast'}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
				onMomentumScrollEnd={updateIndex}
				renderItem={({ item }) => {
					return <ImgSliderItem item={item} onPress={onPress} />;
				}}
			/>
			<View style={styles.pagination}>
				{images?.map((_, i) => (
					<Animated.View
						key={i}
						style={[
							styles.bullet,
							{
								opacity: i === activeIndex ? 1 : 0.3,
							},
						]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		width: width,
		height: height / 2.5,
		borderRadius: 10,
	},
	pagination: {
		flexDirection: 'row',
		position: 'absolute',
		left: '35%',

		bottom: 10,
		alignSelf: 'center',
	},
	bullet: {
		width: 10,
		height: 10,
		borderRadius: 5,
		margin: 5,
		backgroundColor: COLORS.white,
	},
});

export default CardView;
