import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

interface Props {
	_handlePressButtonAsync?: (url: string) => void;
	color?: string;
}

const SocialMedia: FC<Props> = ({ color }: Props) => {
	const _handlePressButtonAsync = async (url: string) => {
		let result = await WebBrowser.openBrowserAsync(url);
	};
	return (
		<>
			<View style={styles.iconContainer}>
				<AntDesign
					name='instagram'
					size={24}
					color={color || 'black'}
					style={styles.iconStyle}
					onPress={() => _handlePressButtonAsync('https://www.instagram.com/chinalinkexpress')}
				/>
				<AntDesign
					name='facebook-square'
					size={24}
					color={color || 'black'}
					style={styles.iconStyle}
					onPress={() => _handlePressButtonAsync('https://www.facebook.com/profile.php?id=61556519083512')}
				/>
				<FontAwesome5
					name='whatsapp'
					size={24}
					color={color || 'black'}
					style={styles.iconStyle}
					onPress={() => _handlePressButtonAsync('https://wa.me/8618851725957')}
				/>
				<FontAwesome5
					name='tiktok'
					size={24}
					color={color || 'black'}
					onPress={() => _handlePressButtonAsync('https://www.tiktok.com/@chinalink.express4?_t=8mcP9s8uM7y&_r=1')}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 10,
	},
	iconStyle: {
		marginRight: 50,
	},
});

export default SocialMedia;
