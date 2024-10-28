import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

type BlockProps = {
	title: string;
	icon: string;
	backgroundColor: string;
	iconLib: 'AntDesign' | 'FontAwesome6' | 'MaterialIcons';
	onPress: () => void;
};

const BlockComponent: React.FC<BlockProps> = ({ title, icon, backgroundColor, iconLib, onPress }) => {
	return (
		<Pressable onPress={onPress} style={[styles.blockContainer, { backgroundColor }]}>
			<View style={styles.innerContainer}>
				<Text style={styles.titleText}>{title}</Text>
				{iconLib === 'AntDesign' && <AntDesign style={styles.position} name={icon} size={28} color='#fff' />}
				{iconLib === 'FontAwesome6' && (
					<FontAwesome6 name={icon} size={24} color={COLORS.white} style={styles.position} />
				)}
				{iconLib === 'MaterialIcons' && <MaterialIcons style={styles.position} name={icon} size={28} color='#fff' />}
			</View>
		</Pressable>
	);
};

export default BlockComponent;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	blockContainer: {
		height: 120,
		width: 160,
		padding: 15,
		borderWidth: 1,
		borderRadius: 10,
		margin: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 4,
	},
	innerContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		fontFamily: Fonts.black, // Make sure this font is defined in your project
		fontSize: 18,
		color: '#fff',
	},
	position: { position: 'absolute', top: 50, left: '65%' },
});
