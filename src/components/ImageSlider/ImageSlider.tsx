import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
const { width, height } = Dimensions.get('window');
interface Props {
	item: {
		public_id: string;
		url: string;
	};
	onPress?: () => void;
}
const ImgSliderItem = ({ item, onPress }: Props) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Image style={styles.image} source={{ uri: item.url }} />
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	image: {
		width: width,
		height: '100%',
		borderRadius: 12,
	},
});

export default ImgSliderItem;
