import React, { FC } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

interface Props {
	img: ImageSourcePropType;
	style: StyleProp<ImageStyle>;
}

const ComppanyLogo: FC<Props> = ({ img, style }: Props) => {
	return <Image source={img || require('../../../assets/images/logoYellow.png')} style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
	container: {
		width: 150,
		height: 150,
	},
});

export default ComppanyLogo;
