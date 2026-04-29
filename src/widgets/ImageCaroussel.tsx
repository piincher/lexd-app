import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { FlashListProps } from '@shopify/flash-list';

//import components
import ImgSliderItem from '@src/shared/ui/ImageSlider';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width, height } = Dimensions.get('window');

interface Props {
	images: { public_id: string; url: string }[];
	onPress?: () => void;
}

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as React.ComponentType<FlashListProps<{ public_id: string; url: string }>>;

const CardView = ({ images, onPress }: Props) => {
	const { colors } = useAppTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	// Use useState with lazy initializer for React Compiler compatibility
	const [scrollX] = useState(() => new Animated.Value(0));

	const updateIndex = (e: any) => {
		const contentOffset = e.nativeEvent.contentOffset;
		const viewSize = e.nativeEvent.layoutMeasurement;
		const newIndex = Math.floor(contentOffset.x / viewSize.width);
		setActiveIndex(newIndex);
	};

	const styles = useMemo(
		() =>
			StyleSheet.create({
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
					backgroundColor: colors.background.card,
				},
			}),
		[colors],
	);

	return (
		<View style={styles.container}>
			<AnimatedFlashList
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

export default CardView;
